import { Request, Response } from "express";
import * as educationService from "../services/education.service";

export const updateEducationOrCreate = async (req: Request, res: Response) => {
  const id = req.params.idAboutMe;
  const data = req.body;

  if (data) {
    const education = await educationService.upsertEducation(id, data);

    return res.status(education.status).json(education);
  }

  return res.status(400).json({
    message: "Bad request",
  });
};
