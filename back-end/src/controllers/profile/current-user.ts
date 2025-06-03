import { RequestHandler } from "express";
import { prisma } from "../../db";

export const createProfile = async (req, res) => {
  try {
    const {
      name,
      about,
      avatarImage,
      socialMediaUrl,
      backgroundImage,
      successMessage,
    } = req.body;

    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Нэвтрээгүй байна" });
    }

    const profile = await prisma.profile.create({
      data: {
        name,
        about,
        avatarImage,
        socialMediaUrl,
        backgroundImage,
        successMessage,
        user: {
          connect: { id: userId },
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.status(200).json({
      message: "Профайл амжилттай үүссэн",
      profile,
    });
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ message: "Failed to create profile" });
  }
};
