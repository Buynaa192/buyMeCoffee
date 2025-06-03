import { Router } from "express";
import { createDonation } from "../controllers/donation/postDonation";
import { authenticationMiddleware } from "../middlewares/authentication";

export const donationRouter = Router().post("/post", createDonation);
