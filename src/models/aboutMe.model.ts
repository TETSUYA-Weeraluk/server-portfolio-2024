import { z } from "zod";

export const createPersonalInfoDTO = z.object({
  id: z.string().nullable(),
  title: z.string().min(3).max(255),
  description: z.string().min(3),
  icon: z.string(),
  libraryIcon: z.enum(["Fa", "Md"]),
  order: z.number(),
});

export const updatePersonalInfoDTO = z.object({
  data: z.array(createPersonalInfoDTO),
  removeId: z.array(z.string()),
});

export const createExperienceDescriptionDTO = z.object({
  id: z.string().nullable(),
  description: z.string().min(3),
});

export const createExperienceDTO = z.object({
  id: z.string().nullable(),
  position: z.string().min(3).max(255),
  company: z.string().min(3).max(255),
  experienceDescription: z.array(createExperienceDescriptionDTO),
  startDate: z.string(),
  endDate: z.string(),
  order: z.number(),
  removeIdExpDesc: z.array(z.string()),
});

export const updateExperienceDTO = z.object({
  exp: z.array(createExperienceDTO),
  removeIdsExperience: z.array(z.string()),
});

export const createEducationDTO = z.object({
  id: z.string().nullable(),
  school: z.string().min(3).max(255),
  description: z.string().min(3),
  location: z.string().min(3).max(255),
  startDate: z.string(),
  endDate: z.string(),
  order: z.number(),
});

export const updateEducationDTO = z.object({
  education: z.array(createEducationDTO),
  removeIdsEducation: z.array(z.string()),
});

export const createSkillDescriptionDTO = z.object({
  id: z.string().nullable(),
  description: z.string().min(3),
  image: z.string().nullable(),
  order: z.number(),
});

export const createSkillDTO = z.object({
  id: z.string().nullable(),
  title: z.string().min(3).max(255),
  skillDescription: z.array(createSkillDescriptionDTO),
  removeIdSkillDesc: z.array(z.string()),
  order: z.number(),
});

export const updateSkillDTO = z.object({
  data: z.array(createSkillDTO),
  removeIds: z.array(z.string()),
});

export const createProjectDTO = z.object({
  id: z.string().nullable(),
  title: z.string().min(3).max(255),
  image: z.string().nullable(),
  description: z.string().min(3),
  link_github: z.string(),
  link_demo: z.string(),
  order: z.number(),
});

export const updateProjectDTO = z.object({
  data: z.array(createProjectDTO),
  removeIds: z.array(z.string()),
});

export const createAboutMeDto = z.object({
  name: z.string().min(3).max(255),
  nickname: z.string().min(3).max(255),
  position: z.string().min(3).max(255),
  welcomeText: z.string().min(3),
  image: z.string().nullable(),
  content: z.string(),
});

export const updateAboutMeDTO = z.object({
  id: z.string().nullable(),
  name: z.string().min(3).max(255),
  nickname: z.string().min(3).max(255),
  position: z.string().min(3).max(255),
  welcomeText: z.string().min(3),
  image: z.string().nullable(),
  imageAboutMe: z.string().nullable(),
  content: z.string(),
  PersonalInfo: z.array(createPersonalInfoDTO),
  Education: z.array(createEducationDTO),
  Experience: z.array(createExperienceDTO),
  Skill: z.array(createSkillDTO),
  Project: z.array(createProjectDTO),
  removeIdsSkill: z.array(z.string()),
  removeIdsExperience: z.array(z.string()),
  removeIdsEducation: z.array(z.string()),
  removeIdsProject: z.array(z.string()),
  removeIdsPersonalInfo: z.array(z.string()),
});

export const updateMainContentDTO = z.object({
  id: z.string(),
  name: z.string().max(255),
  nickname: z.string().max(255),
  position: z.string().min(3).max(255),
  welcomeText: z.string(),
  image: z.string().nullable(),
});

export type UpdateMainContentDTO = z.infer<typeof updateMainContentDTO>;
export type CreateAboutMeDTO = z.infer<typeof createAboutMeDto>;
export type UpdateAboutMeDTO = z.infer<typeof updateAboutMeDTO>;
export type CreatePersonalInfoDTO = z.infer<typeof createPersonalInfoDTO>;
export type CreateExperienceDTO = z.infer<typeof createExperienceDTO>;
export type CreateEducationDTO = z.infer<typeof createEducationDTO>;
export type CreateSkillDTODescription = z.infer<
  typeof createSkillDescriptionDTO
>;
export type CreateSkillDTO = z.infer<typeof createSkillDTO>;
export type CreateProjectDTO = z.infer<typeof createProjectDTO>;
export type CreateExperienceDescriptionDTO = z.infer<
  typeof createExperienceDescriptionDTO
>;

export type UpdatePersonalDTO = z.infer<typeof updatePersonalInfoDTO>;
export type UpdateEducationDTO = z.infer<typeof updateEducationDTO>;
export type UpdateExperienceDTO = z.infer<typeof updateExperienceDTO>;
export type UpdateProjectDTO = z.infer<typeof updateProjectDTO>;
