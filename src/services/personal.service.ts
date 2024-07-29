import { PrismaClient } from "@prisma/client";
import { CreatePersonalInfoDTO } from "../models/aboutMe.model";
import { omit } from "lodash";

const prisma = new PrismaClient();

export const upsertPersonalInfo = async (
  aboutMeId: string,
  personalInfos: CreatePersonalInfoDTO[]
) => {
  return Promise.all(
    personalInfos.map(async (info) => {
      if (info.id) {
        try {
          await prisma.personalInfo.update({
            where: { id: info.id },
            data: {
              description: info.description,
              icon: info.icon,
              libraryIcon: info.libraryIcon,
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
};
