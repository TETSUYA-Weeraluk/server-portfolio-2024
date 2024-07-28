import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      data: users,
      status: 200,
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      status: 500,
    };
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      data: user,
      status: 200,
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      status: 500,
    };
  }
};

export const updateUser = async (id: string, data: any) => {
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return {
      data: user,
      status: 200,
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      status: 500,
    };
  }
};

export const deleteUser = async (id: string) => {
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    return {
      message: "User deleted",
      status: 200,
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      status: 500,
    };
  }
};
