import { Request, Response } from "express";
import * as userService from "../services/users.service";

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers();

  return res.status(users.status).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  return res.status(user.status).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const user = await userService.updateUser(id, data);

  return res.status(user.status).json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await userService.deleteUser(id);

  return res.status(user.status).json(user);
};
