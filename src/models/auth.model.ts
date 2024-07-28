import { z } from "zod";

export const register = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export const login = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type RegisterType = z.infer<typeof register>;

export type LoginType = z.infer<typeof login>;
