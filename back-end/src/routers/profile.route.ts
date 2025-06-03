import { Router } from "express";
import { createProfile } from "../controllers/profile/current-user";
import { authenticationMiddleware } from "../middlewares/authentication";
import { UpdateProfile } from "../controllers/profile/putProfile";
import { updatePassword } from "../controllers/profile/putPassword";
import handler from "../controllers/profile/view";
import { getAllUsers } from "../controllers/profile/getAllProfile";

export const profileRouter = Router()
  .post("/createprofile", authenticationMiddleware, createProfile)
  .put("/put", authenticationMiddleware, UpdateProfile)
  .put("/passUpdate", authenticationMiddleware, updatePassword)
  .get("/users", getAllUsers)
  .get("/:username", handler);
