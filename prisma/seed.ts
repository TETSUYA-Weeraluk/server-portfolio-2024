import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.aboutMe.deleteMany();

  const aboutMe = await prisma.aboutMe.create({
    data: {
      name: "Weeraluk Sopapan",
      nickname: "Tee",
      position: "Frontend Developer",
      welcomeText:
        "I'm currently looking for Junior Frontend Developer position. I'm passionate about coding and learning new things.",
      image: "26176.jpg",
      imageAboutMe: "26088.jpg",
      content:
        "I have 1 year of experience in web application development,specializing in JavaScript and TypeScript. I am skilled in developing web applications using React and Angular. My career objective is to become Fullstack Developer. I hold a Bachelor's degree in Computer Science from Bangkok University.",
      userId: "66a768b2e01314115045631c",
    },
  });

  const aboutMeId = aboutMe.id;

  enum libraryIcon {
    Fa = "Fa",
    Md = "Md",
  }

  const dataPersonalInfo = [
    {
      title: "Name",
      description: "Weeraluk Sopapan",
      icon: "FaAddressCard",
      libraryIcon: libraryIcon.Fa,
      aboutMeId: aboutMeId,
      order: 1,
    },
    {
      title: "Date of Birth",
      description: "08/07/1998",
      icon: "FaBirthdayCake",
      libraryIcon: libraryIcon.Fa,
      aboutMeId: aboutMeId,
      order: 2,
    },
    {
      title: "Email",
      description: "Weeraluk.sopa@gmail.com",
      icon: "MdEmail",
      libraryIcon: libraryIcon.Md,
      aboutMeId: aboutMeId,
      order: 3,
    },
    {
      title: "Phone",
      description: "064-0534466",
      icon: "FaPhoneAlt",
      libraryIcon: libraryIcon.Fa,
      aboutMeId: aboutMeId,
      order: 4,
    },
    {
      title: "Github",
      description: "https://github.com/TETSUYA-Weeraluk",
      icon: "FaGithub",
      libraryIcon: libraryIcon.Fa,
      aboutMeId: aboutMeId,
      order: 5,
    },
  ];

  const personalInfo = await prisma.personalInfo.createMany({
    data: dataPersonalInfo,
  });

  const educationData = [
    {
      school: "Bangkok University",
      description: "Bachelor's degree in Computer Science. 2.79 GPA",
      location: "Pathum thani",
      startDate: "2017-01-01T17:00:00.000Z",
      endDate: "2021-01-01T17:00:00.000Z",
      order: 1,
      aboutMeId: aboutMeId,
    },
    {
      school: "Phuket Wittayalai School",
      description: "English-Mathematics Program. 2.98 GPA",
      location: "Phuket",
      startDate: "2012-01-01T17:00:00.000Z",
      endDate: "2017-01-01T17:00:00.000Z",
      order: 2,
      aboutMeId: aboutMeId,
    },
  ];

  const education = await prisma.education.createMany({
    data: educationData,
  });

  const experienceData = [
    {
      position: "Frontend Developer",
      company: "Maya Wizard Co.,Ltd.",
      startDate: new Date("2023-04-01T17:00:00.000Z"),
      endDate: new Date("2024-04-01T17:00:00.000Z"),
      aboutMeId: aboutMeId,
      order: 1,
    },
    {
      position: "Frontend Developer Intern",
      company: "Nilecon Thailand Co., Ltd.",
      startDate: new Date("2021-01-01T17:00:00.000Z"),
      endDate: new Date("2021-04-01T17:00:00.000Z"),
      aboutMeId: aboutMeId,
      order: 2,
    },
  ];

  const experience = await Promise.all(
    experienceData.map(async (data) => {
      return await prisma.experience.create({
        data: data,
      });
    })
  );

  const experineceDescriptionData = [
    {
      description:
        "Developed and improved web applications for Back-office, focusing on high performance and responsiveness. Used TypeScript to increase code stability and reduce errors.",
      experienceId: experience[0].id,
    },
    {
      description:
        "Developed and improved systems for displaying datasets in tables and charts, making it easier for users to analyze.",
      experienceId: experience[0].id,
    },
    {
      description:
        "Contributed to the development of an Event Management System for creating and managing events, including schedule management and forms validation to ensure accurate and complete user data entry,improving user convenience and reducing operational issues.",
      experienceId: experience[0].id,
    },
    {
      description:
        "Contributed to the development of an E-Commerce system capable of managing products, orders, and promotions. Enabled easy and convenient creation and editing of web pages through a management system.",
      experienceId: experience[0].id,
    },
    {
      description:
        "Worked closely with UX/UI designers and backend developers to design and resolve various issues, incorporating user feedback to continuously improve the system.",
      experienceId: experience[0].id,
    },
    {
      description:
        "Developed complex user interfaces with HTML, CSS, JavaScript, and React, ensuring a user-friendly experience.",
      experienceId: experience[1].id,
    },
    {
      description:
        "Developed and tested responsive design support for all screen sizes.",
      experienceId: experience[1].id,
    },
    {
      description:
        "Designed, developed, and tested APIs using Node.js and Express, connecting to Mysql databases and sending data back to the client to ensure correct functionality.",
      experienceId: experience[1].id,
    },
  ];

  const experienceDescription = await prisma.experienceDescription.createMany({
    data: experineceDescriptionData,
  });

  const skillData = [
    {
      title: "Programming languages",
      aboutMeId: aboutMeId,
      order: 1,
    },
    {
      title: "Frontend",
      aboutMeId: aboutMeId,
      order: 2,
    },
    {
      title: "Backend",
      aboutMeId: aboutMeId,
      order: 3,
    },
    {
      title: "Tools & Another skill",
      aboutMeId: aboutMeId,
      order: 4,
    },
  ];

  const skill = await Promise.all(
    skillData.map(async (data) => {
      return await prisma.skill.create({
        data: data,
      });
    })
  );

  const skillDescriptionData = [
    {
      description: "HTML",
      image: "html.png",
      order: 1,
      skillId: skill[0].id,
    },
    {
      description: "CSS",
      image: "css.png",
      order: 2,
      skillId: skill[0].id,
    },
    {
      description: "JavaScript",
      image: "javascript.png",
      order: 3,
      skillId: skill[0].id,
    },
    {
      description: "TypeScript",
      image: "typescript.png",
      order: 4,
      skillId: skill[0].id,
    },
    {
      description: "React",
      image: "react.png",
      order: 1,
      skillId: skill[1].id,
    },
    {
      description: "Redux",
      image: "redux.png",
      order: 2,
      skillId: skill[1].id,
    },
    {
      description: "Material UI",
      image: "mui.png",
      order: 3,
      skillId: skill[1].id,
    },
    {
      description: "Angular",
      image: "angular.png",
      order: 4,
      skillId: skill[1].id,
    },
    {
      description: "PrimeNG",
      image: "primeng.png",
      order: 5,
      skillId: skill[1].id,
    },
    {
      description: "Angular Material",
      image: "angular.png",
      order: 6,
      skillId: skill[1].id,
    },
    {
      description: "RxJS",
      image: "rxjs.png",
      order: 7,
      skillId: skill[1].id,
    },
    {
      description: "Tailwind CSS",
      image: "tailwind.png",
      order: 9,
      skillId: skill[1].id,
    },
    {
      description: "NodeJS",
      image: "nodejs.png",
      order: 1,
      skillId: skill[2].id,
    },
    {
      description: "Express",
      image: "express.png",
      order: 2,
      skillId: skill[2].id,
    },
    {
      description: "NestJS",
      image: "nestjs.png",
      order: 3,
      skillId: skill[2].id,
    },
    {
      description: "MongoDB",
      image: "mongodb.png",
      order: 4,
      skillId: skill[2].id,
    },
    {
      description: "PrimeNG",
      image: "primeng.png",
      order: 5,
      skillId: skill[2].id,
    },
    {
      description: "PostgreSQL",
      image: "postgresql.png",
      order: 6,
      skillId: skill[2].id,
    },
    {
      description: "Prisma",
      image: "prisma.png",
      order: 7,
      skillId: skill[2].id,
    },
    {
      description: "Docker",
      image: "docker.png",
      order: 1,
      skillId: skill[3].id,
    },
    {
      description: "Git",
      image: "git.png",
      order: 2,
      skillId: skill[3].id,
    },
  ];

  const skillDescription = await prisma.skillDescription.createMany({
    data: skillDescriptionData,
  });

  const projectData = [
    {
      title: "Project....",
      image: null,
      description: "Waiting....",
      link_github: "https://github.com/TETSUYA-Weeraluk",
      link_demo: "https://github.com/TETSUYA-Weeraluk",
      aboutMeId: aboutMeId,
      order: 1,
    },
    {
      title: "Project....",
      image: null,
      description: "Waiting....",
      link_github: "https://github.com/TETSUYA-Weeraluk",
      link_demo: "https://github.com/TETSUYA-Weeraluk",
      aboutMeId: aboutMeId,
      order: 2,
    },
  ];

  const project = await prisma.project.createMany({
    data: projectData,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed data successfully");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
