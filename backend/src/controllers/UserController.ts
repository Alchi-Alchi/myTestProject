import jwt from "jsonwebtoken";
import UserModel from "../models/User";
import bcrypt from "bcrypt";
import { Document } from "mongoose";

interface UserDocument extends Document {
    _doc: any;
}

export const login = async (req: any, res: any) => {
    try {
    const user = await UserModel.findOne({login: req.body.login,}) as UserDocument;
    if (!user) {
        return res.status(400).json({message: 'Wrong login or password'});
    }
    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
    if (!isValidPass) {
        return res.status(400).json({message: 'Wrong login or password'});
    }
    const token = jwt.sign({
        _id: user._id,
    }, 'riddle', {expiresIn: '30d',});
    const {passwordHash, ...userData} = user._doc;
    res.json({...userData, token,});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed',
        });
    }
};

export const register = async (req: any, res: any) => {
    try {
        const password: string = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const doc = new UserModel({
            userName: req.body.userName,
            login: req.body.login,
            passwordHash,
        });
        const user = await doc.save() as unknown as UserDocument;
        const token = jwt.sign({
            _id: user._id,
        }, 'riddle', {expiresIn: '30d',});
        
        res.json({...user._doc, token,});
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Failed',
            });
    }
};

export const getMe = async (req: any, res: any) => {
    try {
        const user = await UserModel.findById(req.userID) as UserDocument;
        if (!user) {
            return res.status(404).json({
                message: 'User does not exist',
            });
        }
        const {passwordHash, ...userData} = user._doc;
        res.json(userData);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed auth',
        });
    };
};

export const removeUser = async (req: any, res: any) => {
    try {
        const userID: string = req.params.id;
        await UserModel.findOneAndDelete({
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