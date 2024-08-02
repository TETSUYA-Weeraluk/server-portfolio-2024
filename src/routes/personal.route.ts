import { Router } from "express";
import * as personalController from "../controllers/personalInfo.controller";
import { validate } from "../middleware/zod.middleware";
import { createEducationDTO } from "../models/aboutMe.model";

const personalRoute = Router();

personalRoute
  .route("/:idAboutMe")
  .patch(
    validate(createEducationDTO),
    personalController.updatePersonalInfoByIdAboutMe
  );

export default personalRoute;
