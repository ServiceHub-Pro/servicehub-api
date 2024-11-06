import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const providerSchema = new Schema({
    name: {type: String,required: true },
    email: {type: String,required: true, unique: true},
    password: {type: String,required: true},
    contact:{type: Number,required: true},
    avatar: {type: String,required: true},
    role:{
        type: String, 
        default: 'provider',
        enum: ['customer', 'provider']

    } 
},  

{
    timestamps: true
});

providerSchema.plugin(toJSON);

export const ProviderModel = model('Provider', providerSchema);
