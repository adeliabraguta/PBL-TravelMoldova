import {model, Schema} from "mongoose";

export const favoriteSchema = new Schema({
    _user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    _destination: {
        type: Schema.Types.ObjectId,
        ref: "destinations",
        required: true
    }
}, {versionKey: false})


export const favoriteModel = new model('favorites', favoriteSchema)

