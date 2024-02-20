"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const utils_1 = require("./utils/utils");
const auth_1 = require("./validations/auth");
const controllers_1 = require("./controllers/controllers");
const db = 'mongodb+srv://Pavel:ThIsAdMiN@atlascluster.kei9u77.mongodb.net/localServer?retryWrites=true&w=majority';
mongoose_1.default
    .connect(db)
    .then((res) => console.log('Connected to DB'))
    .catch((error) => console.log(error));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post('/auth/login', auth_1.validator, utils_1.handleValidationErrors, controllers_1.UserController.login);
app.post('/auth/register', auth_1.registerValidator, utils_1.handleValidationErrors, controllers_1.UserController.register);
app.get('/auth/me', utils_1.checkAuth, controllers_1.UserController.getMe);
app.get('/adminPage', controllers_1.AddUsersController.getUsers);
app.delete('/adminPage/:id', utils_1.checkAuth, controllers_1.UserController.removeUser);
app.listen(4000, () => {
    console.log('Server OK');
});
