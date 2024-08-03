import { Prisma, PrismaClient } from "@prisma/client";
import { omit } from "lodash";
import {
  CreateExperienceDescriptionDTO,
  CreateExperienceDTO,
} from "../models/aboutMe.model";

const prisma = new PrismaClient();

export const selectExperience: Prisma.ExperienceSelect = {
  id: true,
  company: true,
  startDate: true,
  endDate: true,
  position: true,
  experienceDescription: {
    select: {
      id: true,
      description: true,
    },
  },
  order: true,
};

export const getExperienceByAboutMeId = async (aboutMeId: string) => {
  try {
    const experience = await prisma.experience.findMany({
      where: {
        aboutMeId: aboutMeId,
      },
      select: selectExperience,
      orderBy: {
        order: "asc",
      },
    });

    return {
      status: 200,
      data: experience,
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: 400,
      message: error,
    };
  }
};

export const upsertExperienceDescription = async (
  experienceId: string,
  experienceDescriptions: CreateExperienceDescriptionDTO[],
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
  data: {
    exp: CreateExperienceDTO[];
    removeIdsExperience: string[];
  }
) => {
  if (data.removeIdsExperience.length > 0) {
    try {
      await prisma.experience.deleteMany({
        where: {
          id: {
            in: data.removeIdsExperience,
          },
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  await Promise.all(
    data.exp.map(async (experience) => {
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
              ...omit(
                experience,
                "experienceDescription",
                "removeIdExpDesc",
                "id"
              ),
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

  return await getExperienceByAboutMeId(aboutMeId);
};
