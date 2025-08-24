import express from "express";
import {DestinationModel} from "../schemas/destinationSchema.js";
import multer from "multer"
import {ReviewsModel} from "../schemas/reviewSchema.js";
import {UserModel} from "../schemas/userSchema.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})
const upload = multer({storage});

function authMiddleware(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).json({message: "Authentication error"})
    }
    next()
}

router.post('/destination', authMiddleware, upload.array("images", 5), async function (req, res) {
    try {
        const {name, description, location, map, type} = req.body;
        const imageUrls = req.files.map(file => `uploads/${file.filename}`)
        const existingDestination = await DestinationModel.findOne({name})
        if (existingDestination) {
            return res.status(400).json({
                message: `Destination with name ${name} already exists`
            })
        }
        const newDestination = new DestinationModel({
            name,
            description,
            location,
            map,
            images: imageUrls,
            type
        })
        await newDestination.save()
        res.status(200).json({
            message: 'Destination created successfully',
            destination: newDestination,
        })
    } catch (err) {
        res.status(500).json({error: 'Error creating destination'})
    }
})
router.get('/destinations', async function (req, res) {
    const {page = 1, limit = 5, search, type, rating} = req.query
    const startIndex = (page - 1) * limit
    const query = {}
    if (search) {
        query.name = {$regex: search, $options: "i"}
    }
    if (type) {
        const typesArray = type.split(",")
        query.type = { $in: typesArray }
    }
    if (rating) {
        query.rating = { $gte: Math.floor(parseFloat(rating)) }
    }

    try {
        const [countDestinations, destinations] = await Promise.all([
            DestinationModel.countDocuments(),
            DestinationModel.find(query).skip(startIndex).limit(limit)
        ])

        res.status(200).json({
            totalItems: countDestinations,
            totalItemsPerPage: destinations.length,
            totalPages: Math.ceil(countDestinations / limit),
            currentPage: parseInt(page),
            data: destinations

        })
    } catch (error) {
        res.status(500).json({message: "Failed to retrieve destinations"});
    }
})

router.get('/destination/:id', async function (req, res) {
    try {
        const id = req.params.id
        const destination = await DestinationModel.findById(id)
        if (!destination) {
            return res.status(404).json({message: "Destination not found"})
        }
        res.status(200).json(destination)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error retrieving destination"});
    }
})

router.post('/reviews/:id', authMiddleware, async function (req, res) {
    const {rating, comment} = req.body;
    const destinationId = req.params.id;
    const userId = req.user._id;

    try {
        const destination = await DestinationModel.findById(destinationId);

        if (!destination) {
            return res.status(404).json({message: "Destination not found"});
        }

        const newReview = new ReviewsModel({
            _user: userId,
            _destination: destinationId,
            rating,
            comment,
        });
        await newReview.save();

        const allReviews = await ReviewsModel.find({_destination: destinationId});
        const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
        const numberOfRatings = allReviews.length;
        const averageRating = totalRating / numberOfRatings;

        destination.rating = averageRating.toFixed(1);

        await destination.save();

        res.status(201).json({
            message: "Review added successfully",
            review: newReview,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Failed to add review"});
    }
});

router.get('/reviews/:id', async function (req, res) {
    const destinationId = req.params.id
    try {
        const destination = await DestinationModel.findById(destinationId);
        if (!destination) {
            return res.status(404).json({message: "Destination not found"});
        }
        const reviews = await ReviewsModel.find({_destination: destinationId}).populate('_user', 'username');
        res.status(201).json(reviews);

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Failed to get reviews"});
    }
})

router.get('/user/reviews', authMiddleware, async function (req, res) {
    const userId = req.user._id
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        const reviews = await ReviewsModel.find({_user: userId}).populate('_destination', 'name');
        res.status(201).json(reviews);

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Failed to get reviews data"});
    }
})

router.post('/favorite/:id', authMiddleware, async function (req, res) {
    const destinationId = req.body
    const userId = req.user._id;

    try{
        const likes = await UserModel.findById(userId).populate('likes', destinationId);
        if (!likes) {
            return res.status(404).json({message: "No liked destination found"});
        }
        res.status(201).json(likes);

    } catch (error) {
        res.status(500).json({message: "Failed to get likes dada"});
    }
})

export default router
