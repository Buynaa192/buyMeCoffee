import { prisma } from "../../db";
export const getMe = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      omit: { password: true },
      include: {
        profile: true,
        bankCard: true,
        sentDonations: true,
        receivedDonations: {
          include: { sender: { include: { profile: true } } },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
