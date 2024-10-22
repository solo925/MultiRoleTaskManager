import { Router } from "express";
import userController from "../controllers/users/users";


const usersRoute = Router();

usersRoute.use("/", userController);

export default usersRoute;