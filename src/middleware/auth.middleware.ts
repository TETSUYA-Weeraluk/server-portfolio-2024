import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.utils";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  console.log("2");

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      const user = verifyToken(token);
      req.user = user;
      next();
    } catch (err) {
      return res.sendStatus(403);
    }
  } else {
    res.sendStatus(401);
  }
};
