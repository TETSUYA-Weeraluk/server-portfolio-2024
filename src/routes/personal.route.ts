import { Router } from "express";
import * as personalController from "../controllers/personalInfo.controller";
import { validate } from "../middleware/zod.middleware";
import { updatePersonalInfoDTO } from "../models/aboutMe.model";

const personalRoute = Router();

personalRoute
  .route("/:idAboutMe")
  .patch(
    validate(updatePersonalInfoDTO),
    personalController.updatePersonalInfoByIdAboutMe
  );

export default personalRoute;
