import { Router } from "express";

import { checkUserName } from "../controllers/auth/checkUserName";
import { signUp } from "../controllers/auth/sign-up";

import { authenticationMiddleware } from "../middlewares/authentication";
import { getMe } from "../controllers/auth/get-me";
import { signIn } from "../controllers/auth/sign-in";

export const authRouter = Router()
  .get("/me", authenticationMiddleware, getMe)
  .post("/signup", signUp)
  .post("/signin", signIn)
  .post("/checkusername", checkUserName);
