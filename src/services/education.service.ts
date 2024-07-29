import { PrismaClient } from "@prisma/client";
import { CreateEducationDTO } from "../models/aboutMe.model";
import { omit } from "lodash";

const prisma = new PrismaClient();

export const upsertEducation = async (
  aboutMeId: string,
  data: CreateEducationDTO[],
  removeIdsEducation: string[]
) => {
  if (removeIdsEducation && removeIdsEducation.length > 0) {
    try {
      await prisma.education.deleteMany({
        where: {
          id: {
            in: removeIdsEducation,
          },
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  await Promise.all(
    data.map(async (data) => {
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
};
