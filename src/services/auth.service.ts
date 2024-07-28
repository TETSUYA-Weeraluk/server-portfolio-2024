import { PrismaClient } from "@prisma/client";
import { comparePassword, hashPassword } from "../utils/auth.utrils";
import { generateToken } from "../utils/jwt.utils";
import { RegisterType } from "../models/auth.model";

const prisma = new PrismaClient();

const findUniqueUser = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const register = async (data: RegisterType) => {
  try {
    const findUser = await findUniqueUser(data.email);

    if (findUser) {
      return {
        error: "User already exists",
        status: 400,
      };
    }

    const newPassword = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        hashPassword: newPassword,
      },
    });

    const token = await generateToken({ id: user.id, email: user.email });

    return {
      token: token,
      message: "User created successfully",
      status: 201,
    };
  } catch (error) {
    return {
      error: "Internal Server Error",
      status: 500,
    };
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const user = await findUniqueUser(data.email);

    if (!user) {
      return {
        error: "User not found",
        status: 404,
      };
    }

    const isPasswordMatch = await comparePassword(
      data.password,
      user.hashPassword
    );

    if (!isPasswordMatch) {
      return {
        error: "Invalid password",
        status: 400,
      };
    }

    const token = await generateToken({ id: user.id, email: user.email });

    return {
      token: token,
      message: "Login successful",
      status: 200,
    };
  } catch (error) {
    return {
      error: "Internal Server Error",
      status: 500,
    };
  }
};
