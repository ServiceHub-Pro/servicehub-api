import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const serviceSchema = new Schema({
    title: {type: String,required: true },
    description: {type: String,required: true},
    price: {type: Number,required: true},
    image: {type: String,required: true},
    category: {type: String,required: true},
    location: {type: String,required: true},
    user:{type:Types.ObjectId, required: true, ref: 'User'}
}, {
    timestamps: true
});

serviceSchema.plugin(toJSON);

export const ServiceModel = model('Service', serviceSchema);