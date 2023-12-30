import UserModel from "../models/User.js";

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find(req.login);
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to get users',
        });
    }
};