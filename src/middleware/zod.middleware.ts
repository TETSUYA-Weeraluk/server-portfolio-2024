import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue, ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        const errorMessages: { [key: string]: string } = {};

        e.errors.forEach((err) => {
          const path: string = err.path[0] as string;
          errorMessages[path] = err.message;
        });

        res.status(400).json({
          error: errorMessages,
        });
      }
      console.log("test");
    }
  };
