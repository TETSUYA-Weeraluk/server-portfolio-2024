import { Router } from "express";
import { authenticateJWT } from "../middleware/auth.middleware";
import * as aboutMeController from "../controllers/aboutMe.controller";
import { validate } from "../middleware/zod.middleware";
import { createAboutMeDto } from "../models/aboutMe.model";

const aboutMeRoute = Router();

aboutMeRoute
  .route("/")
  .get(aboutMeController.getAboutMe)
  .post(
    authenticateJWT,
    validate(createAboutMeDto),
    aboutMeController.createAboutMe
  );

aboutMeRoute
  .route("/:id")
  .get(authenticateJWT, aboutMeController.getAboutMeById)
  .patch(authenticateJWT, aboutMeController.updateAboutMe)
  .delete(authenticateJWT, aboutMeController.deleteAboutMe);

export default aboutMeRoute;
