"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = exports.getMe = exports.register = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_js_1 = __importDefault(require("../models/User.js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_js_1.default.findOne({ login: req.body.login, });
        if (!user) {
            return res.status(400).json({ message: 'Wrong login or password' });
        }
        const isValidPass = yield bcrypt_1.default.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPass) {
            return res.status(400).json({ message: 'Wrong login or password' });
        }
        const token = jsonwebtoken_1.default.sign({
            _id: user._id,
        }, 'riddle', { expiresIn: '30d', });
        const _a = user._doc, { passwordHash } = _a, userData = __rest(_a, ["passwordHash"]);
        res.json(Object.assign(Object.assign({}, userData), { token }));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed',
        });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const password = req.body.password;
        const salt = yield bcrypt_1.default.genSalt(10);
        const passwordHash = yield bcrypt_1.default.hash(password, salt);
        const doc = new User_js_1.default({
            userName: req.body.userName,
            login: req.body.login,
            passwordHash,
        });
        const user = yield doc.save();
        const token = jsonwebtoken_1.default.sign({
            _id: user._id,
        }, 'riddle', { expiresIn: '30d', });
        res.json(Object.assign(Object.assign({}, user._doc), { token }));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed',
        });
    }
});
exports.register = register;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_js_1.default.findById(req.userID);
        if (!user) {
            return res.status(404).json({
                message: 'User does not exist',
            });
        }
        const _b = user._doc, { passwordHash } = _b, userData = __rest(_b, ["passwordHash"]);
        res.json(userData);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed auth',
        });
    }
    ;
});
exports.getMe = getMe;
const removeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.params.id;
        yield User_js_1.default.findOneAndDelete({
            _id: userID,
        });
        res.json({ message: 'Success', });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed',
        });
    }
});
exports.removeUser = removeUser;
