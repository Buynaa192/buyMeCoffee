import { prisma } from "../../db";

export default async function handler(req, res) {
  const { username } = req.params;

  try {
    const user = await prisma.user.findFirst({
      where: { username },
      include: {
        profile: true,
        bankCard: false,
        receivedDonations: {
          include: { sender: { include: { profile: true } } },
        },
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const { password, ...safeUser } = user;
    return res.status(200).json(safeUser);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
