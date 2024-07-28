import bcrypt from "bcrypt";

const saltRounds = process.env.SALT_ROUNDS as string;

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, Number(saltRounds));
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
