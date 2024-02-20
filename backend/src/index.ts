import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {checkAuth, handleValidationErrors} from "./utils/utils";
import {validator, registerValidator} from "./validations/auth";
import {UserController, AddUsersController} from "./controllers/controllers";

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
app.delete('/adminPage/:id', checkAuth, UserController.removeUser);

app.listen(4000, () => {
    console.log('Server OK');
});