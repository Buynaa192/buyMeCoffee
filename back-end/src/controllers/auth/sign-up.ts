import { RequestHandler } from "express";
import { prisma } from "../../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp: RequestHandler = async (req, res) => {
  const { email, password, username, receivedDonations, bankCard, profile } =
    req.body;
  try {
    const existingUser = await prisma.user.findFirst({ where: { email } });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        receivedDonations,
        bankCard,
        profile,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;

    const token = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET as string
    );

    res.status(200).json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
