import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {checkAuth, handleValidationErrors} from "./utils/utils.js";
import {addUser, validator, registerValidator} from "./validations/auth.js";
import {UserController, AddUsersController} from "./controllers/controllers.js";

const db = 'mongodb+srv://Pavel:ThIsAdMiN@atlascluster.kei9u77.mongodb.net/localServer?retryWrites=true&w=majority';
mongoose
.connect(db)
.then((res) => console.log('Connected to DB'))
.catch((error) => console.log(error));
const app = express();
app.use(express.json());
app.use(cors());

app.post('/auth/login', validator, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidator, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);
app.get('/adminPage', AddUsersController.getUsers);
app.post('/adminPage', checkAuth, addUser, handleValidationErrors, AddUsersController.createUser);
app.delete('/adminPage/:id', checkAuth, UserController.removeUser);
app.patch('/adminPage/:id', checkAuth, addUser, handleValidationErrors, AddUsersController.updateUser);

app.listen(4000, (err) => {
    if (err) {
        return console.log(err)
    };
    console.log('Server OK');
});