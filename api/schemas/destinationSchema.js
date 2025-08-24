import {model, Schema} from "mongoose";

export const destinationSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    map: {
        type: String,
        required: false
    },
    images: {
        type: [String],
        required: false
    },
    rating: {
        type: Number,
        default: 0
    },
    type:{
        type: String,
        required: true,
    }
}, {versionKey: false})

export const DestinationModel = new model('destinations', destinationSchema)

