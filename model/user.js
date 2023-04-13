import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: "String",
        required: true,
        unique: true
    },
    password: {
        type: "String"
    },
    firstName: {
        type: "String",
        required: true,
        unique: true
    },
    lastName: {
        type: "String"
    },
    img: {
        type: "String"
    },
    admin: {
        type: Boolean,
        default: false,
    },
    fromGoogle:{
        type: "Boolean",
        default: false
    }

},{timestamps: true})

export default mongoose.model("User", UserSchema)
