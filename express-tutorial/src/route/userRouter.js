import { Router } from "express";

import {createUser, getSingleUser} from "../controller/userController.js"
import { getUsers } from "../controller/userController.js";
import { deleteUser } from "../controller/userController.js";
const router = Router();

router.post("/users", createUser);
router.get("/users", getUsers);
router.get("/users/:id", getSingleUser )
router.delete("/users/:id", deleteUser)

export default router;