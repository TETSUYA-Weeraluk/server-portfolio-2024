import { Router } from "express";
import authRoute from "./auth.route";
import userRoute from "./users.route";
import aboutMeRoute from "./aboutMe.route";
import personalRoute from "./personal.route";
import educationRoute from "./education.route";

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
];

listRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
