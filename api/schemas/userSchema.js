import {model, Schema} from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import {reviewsSchema} from "./reviewSchema.js";
import {destinationSchema} from "./destinationSchema.js"

const userSchema = new Schema({
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    reviews: [reviewsSchema],
    likes: [destinationSchema]
}, {versionKey: false})

userSchema.plugin(passportLocalMongoose)

export const UserModel = new model('users', userSchema)

