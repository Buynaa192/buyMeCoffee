import { RequestHandler } from "express";
import { prisma } from "../../db";

export const createBankCard: RequestHandler = async (req, res) => {
  try {
    const {
      country,
      lastName,
      firstName,
      expiryDate,
      cardNumber,
      CVC,
      userId,
    } = req.body;

    const bankCard = await prisma.bankCard.create({
      data: {
        country,
        lastName,
        firstName,
        expiryDate,
        cardNumber,
        CVC,
        user: {
          connect: { id: userId },
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.status(200).json({
      bankCard,
    });
  } catch (error) {
    console.error("Error creating bank card:", error);
    res.status(500).json({ message: "Failed to create bank card" });
  }
};
