import { Prisma, PrismaClient } from "@prisma/client";
import { UpdateMainContentDTO } from "../models/aboutMe.model";
import { omit } from "lodash";
import { aboutMeBody } from "./aboutMe.interfaces";
import { selectPersonalInfo } from "./personal.service";
import { selectExperience } from "./experience.service";
import { selectSkill } from "./skill.service";
import { selectEducation } from "./education.service";
import { selectProject } from "./project.service";

const prisma = new PrismaClient();

export const createAboutMe = async (id: string, data: aboutMeBody) => {
  try {
    const findById = await prisma.aboutMe.findUnique({
      where: {
        userId: id,
      },
    });

    // if (findById) return errorSheet()

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
        personalInfo: {
          select: selectPersonalInfo,
          orderBy: {
            order: "asc",
          },
        },
        experience: {
          select: selectExperience,
          orderBy: {
            order: "asc",
          },
        },
        education: {
          select: selectEducation,
          orderBy: {
            order: "asc",
          },
        },
        skill: {
          select: selectSkill,
          orderBy: {
            order: "asc",
          },
        },
        project: {
          select: selectProject,
          orderBy: {
            order: "asc",
          },
        },
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

export const updateAboutMeById = async (
  id: string,
  data: UpdateMainContentDTO
) => {
  try {
    const user = await prisma.aboutMe.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return {
        message: "About me not found",
        status: 404,
      };
    }

    const aboutMe = await prisma.aboutMe.update({
      where: {
        id,
      },
      data: omit(data, "id"),
    });

    return {
      status: 200,
      data: aboutMe,
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
        personalInfo: true,
        experience: true,
        education: true,
        skill: true,
        project: true,
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

export const deleteAboutMe = async (id: string) => {
  try {
    await prisma.aboutMe.delete({
      where: {
        id,
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
