import { Schema,model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const customerSchema = new Schema({
    name: {type: String,required: true },
    email: {type: String,required: true, unique: true},
    password: {type: String,},
    avatar: {type: String,},
    role:{
        type: String,
        default: "customer"
    } 
}, 
{
    timestamps: true
});

customerSchema.plugin(toJSON);

export const CustomerModel = model('Customer', customerSchema);