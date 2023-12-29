import mongoose from "mongoose";
const AddUserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true,
    },
}, {timestamps: true,},);
export default mongoose.model('AddUserModel', AddUserSchema);