import { Router } from "express";
import * as personalController from "../controllers/personalInfo.controller";

const personalRoute = Router();

personalRoute
  .route("/:idAboutMe")
  .patch(personalController.updatePersonalInfoByIdAboutMe);

export default personalRoute;
