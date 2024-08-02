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

export const upsetSkillDescription = async (
  data: CreateSkillDTODescription[],
  skillId: string
) => {
  await Promise.all(
    data.map(async (skillDescription) => {
      if (skillDescription.id) {
        await prisma.skillDescription.update({
          where: {
            id: skillDescription.id,
          },
          data: {
            description: skillDescription.description,
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
  removeIdsSkill: string[],
  data: CreateSkillDTO[],
  aboutMeId: string
) => {
  if (removeIdsSkill && removeIdsSkill.length > 0) {
    try {
      await prisma.skill.deleteMany({
        where: {
          id: {
            in: removeIdsSkill,
          },
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  await Promise.all(
    data.map(async (skill) => {
      let skillId = skill.id;

      if (skill.id) {
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
        const newSkill = await prisma.skill.create({
          data: {
            ...omit(skill, ["skillDescription", "id", "removeIdSkillDesc"]),
            aboutMeId: aboutMeId,
          },
        });

        skillId = newSkill.id;
      }

      if (skill.skillDescription && skillId) {
        await upsetSkillDescription(skill.skillDescription, skillId);
      }
    })
  );
};
