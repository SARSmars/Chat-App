import { profile } from "console";
import { subscribe } from "diagnostics_channel";
import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        default: "https://stock.adobe.com/search?k=profile",
    },
},{timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;