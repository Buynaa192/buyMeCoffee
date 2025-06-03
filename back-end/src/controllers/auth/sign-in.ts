import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { prisma } from "../../db";

// export const signIn = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await prisma.user.findFirst({
//       where: { email },
//     });

//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return res
//         .status(401)
//         .json({ message: "Email or password is incorrect" });
//     }

//     const token = jwt.sign(
//       { userId: user.id },
//       process.env.JWT_SECRET as string
//     );

//     const { password: _, ...userWithoutPassword } = user;

//     return res.status(200).json({
//       user: userWithoutPassword,
//       token,
//     });
//   } catch (error) {
//     console.error("Sign-in error:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: { email },
      include: { profile: true, bankCard: true },
    });

    if (!user) {
      return res.status(401).json({ message: "Хэрэглэгч олдсонгүй" });
    }

    const { password: hashedPassword, ...userWithoutPassword } = user;
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordMatch) {
      res.status(401).json({ message: "user or password invalid" });
    }
    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("Sign-in error:", error);
    return res.status(500).json({ message: "Дотоод серверийн алдаа" });
  }
};
