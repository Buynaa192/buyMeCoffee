import { Request, Response } from "express";
import { prisma } from "../../db";

export const updateBankCard = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  const { country, firstName, lastName, cardNumber, expiryDate, CVC } =
    req.body;

  const existingCard = await prisma.bankCard.findUnique({
    where: { userId },
  });

  if (!existingCard) {
    res.status(404);
    throw new Error("Bank card not found for user");
  }

  const updatedCard = await prisma.bankCard.update({
    where: { userId },
    data: {
      country,
      firstName,
      lastName,
      cardNumber,
      expiryDate,
      CVC,
    },
  });

  res.status(200).json({
    message: "Bank card updated successfully",
    bankCard: updatedCard,
  });
};
