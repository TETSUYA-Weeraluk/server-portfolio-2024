import { Router } from "express";
import authRoute from "./auth.route";
import userRoute from "./users.route";
import aboutMeRoute from "./aboutMe.route";
import personalRoute from "./personal.route";
import educationRoute from "./education.route";
import experienceRoute from "./experience.route";
import skillRoute from "./skill.route";

const router = Router();

const listRoute = [
  {
    path: "/",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/about-me",
    route: aboutMeRoute,
  },
  {
    path: "/personal-info",
    route: personalRoute,
  },
  {
    path: "/education",
    route: educationRoute,
  },
  {
    path: "/experience",
    route: experienceRoute,
  },
  {
    path: "/skill",
    route: skillRoute,
  },
];

listRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
