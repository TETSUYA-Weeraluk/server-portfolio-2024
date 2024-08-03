import { Prisma, PrismaClient } from "@prisma/client";
import { UpdateEducationDTO } from "../models/aboutMe.model";
import { omit } from "lodash";

const prisma = new PrismaClient();

export const selectEducation: Prisma.EducationSelect = {
  id: true,
  school: true,
  description: true,
  location: true,
  startDate: true,
  endDate: true,
  order: true,
};

export const getEducationByIdAboutMe = async (aboutMeId: string) => {
  try {
    const education = await prisma.education.findMany({
      where: {
        aboutMeId,
      },
      select: selectEducation,
      orderBy: {
        order: "asc",
      },
    });

    return {
      status: 200,
      data: education,
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: 500,
      message: "Internal server error",
    };
  }
};

export const upsertEducation = async (
  aboutMeId: string,
  data: UpdateEducationDTO
) => {
  if (data.removeIdsEducation && data.removeIdsEducation.length > 0) {
    try {
      const result = await prisma.education.deleteMany({
        where: {
          id: {
            in: data.removeIdsEducation,
          },
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  try {
    await Promise.all(
      data.education.map(async (data) => {
        if (data.id) {
          try {
            await prisma.education.update({
              where: { id: data.id },
              data: {
                school: data.school,
                description: data.description,
                location: data.location,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                updatedAt: new Date(),
                order: data.order,
              },
            });
          } catch (error) {
            console.log("error", error);
          }
        } else {
          const newData = omit(data, "id");
          try {
            await prisma.education.create({
              data: {
                ...newData,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                aboutMeId,
              },
            });
          } catch (error) {
            console.log("error", error);
          }
        }
      })
    );

    const newData = await getEducationByIdAboutMe(aboutMeId);

    return newData;
  } catch (error) {
    console.log("error", error);
    return {
      status: 500,
      message: "Internal server error",
    };
  }
};
