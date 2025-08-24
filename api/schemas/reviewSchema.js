import {model, Schema} from "mongoose";

export const reviewsSchema = new Schema({
    _user:{
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    _destination: {
        type: Schema.Types.ObjectId,
        ref: "destinations",
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    }

}, {versionKey: false})

export const ReviewsModel = new model('reviews', reviewsSchema)

