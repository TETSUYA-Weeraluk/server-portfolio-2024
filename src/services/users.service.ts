import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const selectUser: Prisma.UserSelect = {
  id: true,
  email: true,
};

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: selectUser,
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
      select: selectUser,
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
