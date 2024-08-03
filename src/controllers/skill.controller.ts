import { Request, Response } from "express";
import * as skillService from "../services/skill.service";

export const updateSkill = async (req: Request, res: Response) => {
  const id = req.params.idAboutMe;

  const data = req.body;

  if (data) {
    const skill = await skillService.upsertSkills(id, data);

    return res.status(skill.status).json(skill);
  }

  return res.status(400).json({ message: "Failed" });
};
