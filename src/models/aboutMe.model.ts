import { z } from "zod";

export const createAboutMeDto = z.object({
  name: z.string().min(3).max(255),
  nickname: z.string().min(3).max(255),
  position: z.string().min(3).max(255),
  welcomeText: z.string().min(3),
  image: z.string().nullable(),
  content: z.string(),
});

export const createPersonalInfoDTO = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3),
  icon: z.string().nullable(),
  aboueMeId: z.string(),
});

export const createEducationDTO = z.object({
  school: z.string().min(3).max(255),
  description: z.string().min(3),
  location: z.string().min(3).max(255),
  startDate: z.string(),
  endDate: z.string(),
  aboueMeId: z.string(),
});

export const createExperienceDTO = z.object({
  position: z.string().min(3).max(255),
  company: z.string().min(3).max(255),
  location: z.string().min(3).max(255),
  startDate: z.string(),
  endDate: z.string(),
  aboueMeId: z.string(),
});

export const createExperienceDescriptionDTO = z.object({
  description: z.string().min(3),
  experienceId: z.string(),
});

export const createSkillDTO = z.object({
  title: z.string().min(3).max(255),
  image: z.string().nullable(),
  aboueMeId: z.string(),
});

export const createProjectDTO = z.object({
  title: z.string().min(3).max(255),
  image: z.string().nullable(),
  description: z.string().min(3),
  link_github: z.string().nullable(),
  link_demo: z.string().nullable(),
  aboueMeId: z.string(),
});

export type CreateAboutMeDTO = z.infer<typeof createAboutMeDto>;
