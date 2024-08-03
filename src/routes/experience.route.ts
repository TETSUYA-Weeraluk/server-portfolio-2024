import { Router } from "express";
import { validate } from "../middleware/zod.middleware";
import { updateExperienceDTO } from "../models/aboutMe.model";
import * as experienceController from "../controllers/experience.controller";

const experienceRoute = Router();

experienceRoute
  .route("/:idAboutMe")
  .patch(
    validate(updateExperienceDTO),
    experienceController.updateExperienceDTO
  );

export default experienceRoute;
