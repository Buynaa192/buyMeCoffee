import { Router } from "express";
import { createBankCard } from "../controllers/bankCard/postBankAccaunt";
import { getBankCard } from "../controllers/bankCard/getbank";
import { updateBankCard } from "../controllers/bankCard/putBank";
import { authenticationMiddleware } from "../middlewares/authentication";

export const BankCardRouter = Router()
  .post("/post", createBankCard)
  .get("/get", getBankCard)
  .put("/updateBankCard", authenticationMiddleware, updateBankCard);
