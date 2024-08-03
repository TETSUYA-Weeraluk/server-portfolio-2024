import { Request, Response } from "express";
import * as experienceService from "../services/experience.service";

export const updateExperienceDTO = async (req: Request, res: Response) => {
  const id = req.params.idAboutMe;
  const data = req.body;

  if (data) {
    const experience = await experienceService.upsertExperience(id, data);

    return res.status(200).json(experience);
  }

  return res.status(400).json({ message: "Invalid data" });
};
