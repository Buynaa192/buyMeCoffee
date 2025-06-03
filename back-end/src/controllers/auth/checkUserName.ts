import { RequestHandler } from "express";
import { prisma } from "../../db";

export const checkUserName: RequestHandler = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await prisma.user.findFirst({ where: { username } });
    res.status(200).json({ isExist: !!user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
