import { Prisma, PrismaClient } from "@prisma/client";
import { CreateProjectDTO } from "../models/aboutMe.model";
import { omit } from "lodash";

const prisma = new PrismaClient();

export const selectProject: Prisma.ProjectSelect = {
  id: true,
  title: true,
  image: true,
  description: true,
  link_demo: true,
  link_github: true,
  order: true,
};

export const getProjectByIdAboutMe = async (idAboutMe: string) => {
  try {
    const project = await prisma.project.findMany({
      where: {
        aboutMeId: idAboutMe,
      },
      select: selectProject,
      orderBy: {
        order: "asc",
      },
    });

    return {
      data: project,
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

export const upsertProject = async (
  aboutMeId: string,
  data: {
    data: CreateProjectDTO[];
    removeIds: string[];
  }
) => {
  if (data.removeIds && data.removeIds.length > 0) {
    try {
      await prisma.project.deleteMany({
        where: {
          id: {
            in: data.removeIds,
          },
        },
      });
    } catch (error) {
      console.log("error", error);
      return {
        message: "Internal Server Error",
        status: 500,
      };
    }
  }

  await Promise.all(
    data.data.map(async (project) => {
      if (project.id) {
        try {
          await prisma.project.update({
            where: {
              id: project.id,
            },
            data: {
              ...omit(project, "id"),
            },
          });
        } catch (error) {
          console.log("error", error);
        }
      } else {
        try {
          const newData = omit(project, "id");
          await prisma.project.create({
            data: {
              ...newData,
              aboutMeId,
            },
          });
        } catch (error) {
          console.log("error", error);
        }
      }
    })
  );

  const getProject = await getProjectByIdAboutMe(aboutMeId);

  return getProject;
};
