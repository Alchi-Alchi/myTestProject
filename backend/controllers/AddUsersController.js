import AddUserModel from "../models/AddUser.js";
import UserModel from "../models/User.js";

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find(req.login); //find().populate('user').exec();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to get users',
        });
    }
};

export const createUser = async (req, res) => {
    try {
        const doc = new AddUserModel({
            login: req.body.login,
            password: req.body.password,
            user: req.userID,
        });
        const thisUser = await doc.save();
        res.json(thisUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to add user',
        });
    }
};

export const removeUser = async (req, res) => {
    try {
        const userID = req.params.id;
        await AddUserModel.findOneAndDelete({
            _id: userID,
        });
        res.json({message: 'Success',});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed',
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const userID = req.params.id;
        await AddUserModel.updateOne({_id: userID,}, {
            login: req.body.login,
            password: req.body.password,
            user: req.userID,
        });
        res.json({message: 'Data updated',});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed',
        });
    }
};