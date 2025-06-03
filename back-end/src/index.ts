import cors from "cors";
import express from "express";
import { config } from "dotenv";
import { authRouter } from "./routers/auth.route";
import { donationRouter } from "./routers/donation.route";
import { profileRouter } from "./routers/profile.route";
import { BankCardRouter } from "./routers/bankCard.route";
// types/express/index.d.ts

declare namespace Express {
  export interface Request {
    userId: number;
  }
}
// types/express/index.d.ts
import "express";

declare module "express-serve-static-core" {
  interface Request {
    userId?: number;
  }
}

config();
const app = express();
const port = 3001;

app
  .use(cors())
  .use(express.json())
  .use("/auth", authRouter)
  .use("/donation", donationRouter)
  .use("/profile", profileRouter)
  .use("/bank-card", BankCardRouter);

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
