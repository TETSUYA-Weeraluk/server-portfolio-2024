import { Router } from "express";
import * as educationController from "../controllers/education.controller";
import { validate } from "../middleware/zod.middleware";
import { updateEducationDTO } from "../models/aboutMe.model";

const educationRoute = Router();

educationRoute
  .route("/:idAboutMe")
  .patch(
    validate(updateEducationDTO),
    educationController.updateEducationOrCreate
  );

export default educationRoute;
