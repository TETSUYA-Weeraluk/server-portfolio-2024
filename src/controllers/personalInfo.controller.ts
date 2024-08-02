import { Request, Response } from "express";
import * as personalInfoService from "../services/personal.service";

export const updatePersonalInfoByIdAboutMe = async (
  req: Request,
  res: Response
) => {
  const id = req.params.idAboutMe;

  const personalInfo = await personalInfoService.upsertPersonalInfo(
    id,
    req.body.data
  );

  // return res.send("test");
  return res.status(personalInfo.status).json(personalInfo);
};
