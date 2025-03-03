import express from 'express';
import {createUser, getUsers, updateUser, deleteUser} from '../controllers/userController.js'

const crudRoutes = express.Router()

crudRoutes.post("/", createUser);
crudRoutes.get("/", getUsers);
crudRoutes.put("/:id", updateUser);
crudRoutes.delete("/:id", deleteUser);

export default crudRoutes
