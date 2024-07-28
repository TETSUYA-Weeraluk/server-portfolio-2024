import { Request, Response } from "express";
import * as userService from "../services/auth.service";
import { RegisterType } from "../models/auth.model";

export const signUp = async (req: Request, res: Response) => {
  const data: RegisterType = req.body;
  const user = await userService.register(data);
  res.json(user);
};

export const signIn = async (req: Request, res: Response) => {
  const data: { email: string; password: string } = req.body;

  const user = await userService.login(data);

  res.json(user);
};
