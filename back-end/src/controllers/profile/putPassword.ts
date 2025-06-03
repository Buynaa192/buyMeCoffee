import { Request, RequestHandler, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../../db";

export const updatePassword = async (req, res) => {
  try {
    const userId = req.userId;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Password update error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
