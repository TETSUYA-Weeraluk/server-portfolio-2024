import { Router } from "express";
import * as skillController from "../controllers/skill.controller";
import { validate } from "../middleware/zod.middleware";
import { updateSkillDTO } from "../models/aboutMe.model";

const skillRoute = Router();

skillRoute
  .route("/:idAboutMe")
  .patch(validate(updateSkillDTO), skillController.updateSkill);

export default skillRoute;
