import { RequestHandler } from "express";
import { prisma } from "../../db";

export const UpdateProfile = async (req, res) => {
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

    const UpdateProfile = await prisma.profile.updateMany({
      where: {
        userId: userId,
      },
      data: {
        name,
        about,
        avatarImage,
        socialMediaUrl,
        backgroundImage,
        successMessage,
        updatedAt: new Date(),
      },
    });

    res.status(200).json({
      UpdateProfile,
    });
  } catch (error) {
    console.error("Error update profile:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};
