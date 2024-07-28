import { Router } from "express";
import * as userController from "../controllers/users.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const userRoute = Router();

userRoute.use(authenticateJWT);

userRoute.route("/").get(userController.getUsers);

userRoute
  .route("/:id")
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default userRoute;
