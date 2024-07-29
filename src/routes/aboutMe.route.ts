import { Router } from "express";
import { authenticateJWT } from "../middleware/auth.middleware";
import * as aboutMeController from "../controllers/aboutMe.controller";
import { validate } from "../middleware/zod.middleware";
import { createAboutMeDto } from "../models/aboutMe.model";

const aboutMeRoute = Router();

aboutMeRoute.use(authenticateJWT);

aboutMeRoute
  .route("/")
  .get(aboutMeController.getAboutMe)
  .post(validate(createAboutMeDto), aboutMeController.createAboutMe);

aboutMeRoute
  .route("/:id")
  .get(aboutMeController.getAboutMeById)
  .patch(aboutMeController.updateAboutMe)
  .delete(aboutMeController.deleteAboutMe);

export default aboutMeRoute;
