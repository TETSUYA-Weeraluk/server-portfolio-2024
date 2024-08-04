import { Request, Response } from "express";
import * as projectService from "../services/project.service";

export const updateProjectByIdAboutMe = async (req: Request, res: Response) => {
  const id = req.params.idAboutMe;
  const data = req.body;

  if (data) {
    const project = await projectService.upsertProject(id, data);

    return res.status(project.status).json(project);
  }

  return {
    status: 400,
    message: "Bad request",
  };
};
