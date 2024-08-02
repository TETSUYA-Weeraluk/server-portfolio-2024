import { Prisma, PrismaClient } from "@prisma/client";
import { CreatePersonalInfoDTO } from "../models/aboutMe.model";
import { omit } from "lodash";

const prisma = new PrismaClient();

export const selectPersonalInfo: Prisma.PersonalInfoSelect = {
  id: true,
  title: true,
  description: true,
  libraryIcon: true,
  icon: true,
  order: true,
};

export const selectPersonalInfoByAboutMeId = async (aboutMeId: string) => {
  try {
    const personalInfo = await prisma.personalInfo.findMany({
      where: {
        aboutMeId,
      },
      select: selectPersonalInfo,
      orderBy: {
        order: "asc",
      },
    });

    return {
      status: 200,
      data: personalInfo,
    };
  } catch (error) {
    return {
      status: 500,
      message: error,
    };
  }
};

export const upsertPersonalInfo = async (
  aboutMeId: string,
  personalInfos: CreatePersonalInfoDTO[]
) => {
  try {
    const personalInfo = await Promise.all(
      personalInfos.map(async (info) => {
        if (info.id) {
          try {
            await prisma.personalInfo.update({
              where: { id: info.id },
              data: {
                description: info.description,
                icon: info.icon,
                libraryIcon: info.libraryIcon,
                order: Number(info.order),
                title: info.title,
              },
            });
          } catch (error) {
            console.log("error", error);
          }
        } else {
          const newData = omit(info, "id");
          try {
            await prisma.personalInfo.create({
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

    const data = await selectPersonalInfoByAboutMeId(aboutMeId);

    return data;
  } catch (error) {
    return {
      status: 500,
      message: error,
    };
  }
};
