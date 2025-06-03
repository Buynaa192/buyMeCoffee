import { RequestHandler } from "express";
import { prisma } from "../../db";

export const createDonation: RequestHandler = async (req, res) => {
  const { specialMessage, amount, recipientId, senderId } = req.body;

  try {
    const donations = await prisma.donation.create({
      data: {
        amount,
        specialMessage,
        recipiented: {
          connect: { id: recipientId },
        },
        sender: {
          connect: { id: senderId },
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.status(200).json({
      donations,
    });
  } catch (error) {
    console.error("Error creating donation:", error);
    res.status(500).json({ message: "Failed to create donation" });
  }
};
