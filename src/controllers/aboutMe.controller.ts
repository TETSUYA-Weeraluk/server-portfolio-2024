import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import * as aboutMeService from "../services/aboutMe.service";

export const createAboutMe = async (req: Request, res: Response) => {
  const id = (req as AuthenticatedRequest)?.user?.id;

  const aboutMe = await aboutMeService.createAboutMe(id!, req.body);

  return res.status(aboutMe.status).json(aboutMe);
};

export const getAboutMe = async (req: Request, res: Response) => {
  const aboutMe = await aboutMeService.getAboutMe();

  return res.status(aboutMe.status).json(aboutMe);
};

export const getAboutMeById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const aboutMe = await aboutMeService.getAboutMeById(id);

  return res.status(aboutMe.status).json(aboutMe);
};

export const updateAboutMe = async (req: Request, res: Response) => {
  const id = req.params.id;

  const aboutMe = await aboutMeService.updateAboutMe(id, req.body);

  return res.status(aboutMe.status).json(aboutMe);
};

export const deleteAboutMe = async (req: Request, res: Response) => {
  const id = req.params.id;

  const aboutMe = await aboutMeService.deleteAboutMe(id);

  return res.status(aboutMe.status).json(aboutMe);
};
