import { RequestHandler } from "express";
import { prisma } from "../../db";

export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        profile: true,
      },
    });

    const safeUsers = users.map(({ password, ...rest }) => rest);

    res.status(200).json(safeUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
