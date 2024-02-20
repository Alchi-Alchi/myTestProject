import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
}, {timestamps: true,},);
export default mongoose.model('UserModel', UserSchema);