import { Prisma, PrismaClient } from "@prisma/client";
import { omit } from "lodash";
import {
  createExperienceDescriptionDTO,
  CreateExperienceDTO,
} from "../models/aboutMe.model";

const prisma = new PrismaClient();

export const selectExperience: Prisma.ExperienceSelect = {
  id: true,
  company: true,
  startDate: true,
  endDate: true,
  position: true,
  experienceDescription: true,
  order: true,
};


export const upsertExperienceDescription = async (
  experienceId: string,
  experienceDescriptions: createExperienceDescriptionDTO[],
  removeIds: string[]
) => {
  if (removeIds.length > 0) {
    try {
      await prisma.experienceDescription.deleteMany({
        where: {
          id: {
            in: removeIds,
          },
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  await Promise.all(
    experienceDescriptions.map(async (data) => {
      if (data.id) {
        try {
          await prisma.experienceDescription.update({
            where: { id: data.id },
            data: {
              description: data.description,
            },
          });
        } catch (error) {
          console.log("error", error);
        }
      } else {
        const newData = omit(data, "id");
        try {
          await prisma.experienceDescription.create({
            data: {
              ...newData,
              experienceId,
            },
          });
        } catch (error) {
          console.log("error", error);
        }
      }
    })
  );
};

export const upsertExperience = async (
  aboutMeId: string,
  experiences: CreateExperienceDTO[],
  removeIds: string[]
) => {
  if (removeIds.length > 0) {
    try {
      await prisma.experience.deleteMany({
        where: {
          id: {
            in: removeIds,
          },
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  await Promise.all(
    experiences.map(async (experience) => {
      if (experience.removeIdExpDesc && experience.removeIdExpDesc.length > 0) {
        try {
          await prisma.experienceDescription.deleteMany({
            where: {
              id: {
                in: experience.removeIdExpDesc,
              },
            },
          });
        } catch (error) {
          console.log("error", error);
        }
      }

      let experienceId = experience.id;

      if (experienceId) {
        try {
          await prisma.experience.update({
            where: { id: experienceId },
            data: {
              ...omit(experience, "experienceDescription", "removeIdExpDesc"),
              startDate: new Date(experience.startDate),
              endDate: new Date(experience.endDate),
              updatedAt: new Date(),
            },
          });
        } catch (error) {
          console.log("error", error);
        }
      } else {
        try {
          const createdExperience = await prisma.experience.create({
            data: {
              ...omit(
                experience,
                "experienceDescription",
                "removeIdExpDesc",
                "id"
              ),
              startDate: new Date(experience.startDate),
              endDate: new Date(experience.endDate),
              aboutMeId,
            },
          });
          experienceId = createdExperience.id;
        } catch (error) {
          console.log("error", error);
        }
      }

      if (experience.experienceDescription && experienceId) {
        await upsertExperienceDescription(
          experienceId,
          experience.experienceDescription,
          experience.removeIdExpDesc || []
        );
      }
    })
  );
};
