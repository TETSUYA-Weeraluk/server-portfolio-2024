import { PrismaClient } from "@prisma/client";
import { CreateAboutMeDTO } from "../models/aboutMe.model";

const prisma = new PrismaClient();

export const createAboutMe = async (id: string, data: CreateAboutMeDTO) => {
  try {
    const findById = await prisma.aboutMe.findUnique({
      where: {
        userId: id,
      },
    });

    if (findById) {
      return {
        message: "About me already exists",
        status: 400,
      };
    }

    const aboutMe = await prisma.aboutMe.create({
      data: {
        ...data,
        userId: id,
      },
    });

    return {
      message: "Successfully created about me",
      data: aboutMe,
      status: 201,
    };
  } catch (error) {
    console.log("error", error);
    return {
      message: "Internal Server Error",
      status: 500,
    };
  }
};

export const getAboutMe = async () => {
  try {
    const aboutMe = await prisma.aboutMe.findMany({
      include: {
        user: {
          select: {
            email: true,
          },
        },
        PersonalInfo: true,
        Experience: true,
        Education: true,
        Skill: true,
        Project: true,
      },
    });
    return {
      message: "Successfully retrieved about me",
      data: aboutMe,
      status: 200,
    };
  } catch (error) {
    console.log("error", error);
    return {
      message: "Internal Server Error",
      status: 500,
    };
  }
};

export const getAboutMeById = async (id: string) => {
  try {
    const aboutMe = await prisma.aboutMe.findUnique({
      where: {
        id: id,
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
        PersonalInfo: true,
        Experience: true,
        Education: true,
        Skill: true,
        Project: true,
      },
    });

    if (!aboutMe) {
      return {
        message: "About me not found",
        status: 404,
      };
    }

    return {
      message: "Successfully retrieved about me",
      data: aboutMe,
      status: 200,
    };
  } catch (error) {
    console.log("error", error);
    return {
      message: "Internal Server Error",
      status: 500,
    };
  }
};

export const updateAboutMe = async (id: string, data: CreateAboutMeDTO) => {
  try {
    const aboutMe = await prisma.aboutMe.updateMany({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });

    return {
      message: "Successfully updated about me",
      data: aboutMe,
      status: 200,
    };
  } catch (error) {
    console.log("error", error);
    return {
      message: "Internal Server Error",
      status: 500,
    };
  }
};

export const deleteAboutMe = async (id: string) => {
  try {
    await prisma.aboutMe.delete({
      where: {
        id: id,
      },
    });

    return {
      message: "Successfully deleted about me",
      status: 200,
    };
  } catch (error) {
    console.log("error", error);
    return {
      message: "Internal Server Error",
      status: 500,
    };
  }
};
