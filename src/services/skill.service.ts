import { Prisma, PrismaClient } from "@prisma/client";
import {
  CreateSkillDTO,
  CreateSkillDTODescription,
} from "../models/aboutMe.model";
import { omit } from "lodash";

const prisma = new PrismaClient();

export const selectSkill: Prisma.SkillSelect = {
  id: true,
  title: true,
  skillDescription: {
    select: {
      id: true,
      image: true,
      description: true,
      order: true,
    },
    orderBy: {
      order: "asc",
    },
  },
  order: true,
};

export const getSkillsByIdAboutMe = async (idAboutMe: string) => {
  try {
    const skill = await prisma.skill.findMany({
      where: {
        aboutMeId: idAboutMe,
      },
      select: selectSkill,
      orderBy: {
        order: "asc",
      },
    });

    return skill;
  } catch (error) {
    console.log("error", error);
    return {
      message: "Internal Server Error",
      status: 500,
    };
  }
};

export const upsetSkillDescription = async (
  data: CreateSkillDTODescription[],
  skillId: string,
  removeIds: string[]
) => {
  if (removeIds.length > 0) {
    try {
      await prisma.skillDescription.deleteMany({
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
    data.map(async (skillDescription) => {
      if (skillDescription.id) {
        await prisma.skillDescription.update({
          where: {
            id: skillDescription.id,
          },
          data: {
            description: skillDescription.description,
            order: skillDescription.order,
            image: skillDescription.image,
          },
        });
      } else {
        await prisma.skillDescription.create({
          data: {
            ...omit(skillDescription, ["id"]),
            skillId: skillId,
          },
        });
      }
    })
  );
};

export const upsertSkills = async (
  aboutMeId: string,
  data: {
    removeIds: string[];
    data: CreateSkillDTO[];
  }
) => {
  console.log(data);
  if (data.removeIds && data.removeIds.length > 0) {
    try {
      await prisma.skill.deleteMany({
        where: {
          id: {
            in: data.removeIds,
          },
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  await Promise.all(
    data.data.map(async (skill) => {
      let skillId = skill.id;

      if (skill.id) {
        console.log("skill123", skill);
        const skillId = skill.id;
        await prisma.skill.update({
          where: {
            id: skillId,
          },
          data: {
            ...omit(skill, ["skillDescription", "id", "removeIdSkillDesc"]),
          },
        });
      } else {
        console.log("skill321", skill);
        const newSkill = await prisma.skill.create({
          data: {
            ...omit(skill, ["skillDescription", "id", "removeIdSkillDesc"]),
            aboutMeId: aboutMeId,
          },
        });

        skillId = newSkill.id;
      }

      if (skill.skillDescription && skillId) {
        await upsetSkillDescription(
          skill.skillDescription,
          skillId,
          skill.removeIdSkillDesc || []
        );
      }
    })
  );

  const newSkill = await getSkillsByIdAboutMe(aboutMeId);

  return {
    data: newSkill,
    status: 200,
  };
};
