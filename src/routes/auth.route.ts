import { Router } from "express";
import { validate } from "../middleware/zod.middleware";
import * as authController from "../controllers/auth.controller";
import { register, login } from "../models/auth.model";

const authRoute = Router();

authRoute.route("/register").post(validate(register), authController.signUp);

authRoute.route("/login").post(validate(login), authController.signIn);

export default authRoute;
