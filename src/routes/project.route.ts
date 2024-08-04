import { Router } from "express";
import * as projectController from "../controllers/project.controller";
import { validate } from "../middleware/zod.middleware";
import { updateProjectDTO } from "../models/aboutMe.model";

const projectRoute = Router();

projectRoute
  .route("/:idAboutMe")
  .patch(
    validate(updateProjectDTO),
    projectController.updateProjectByIdAboutMe
  );

export default projectRoute;
