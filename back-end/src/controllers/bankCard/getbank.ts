import { prisma } from "../../db";

export const getBankCard = async (req, res) => {
  const userIdStr = req.query.userId;

  if (typeof userIdStr !== "string") {
    return res
      .status(400)
      .json({ message: "userId query parameter is required" });
  }

  const userId = Number(userIdStr);

  if (isNaN(userId)) {
    return res.status(400).json({ message: "userId must be a valid number" });
  }

  try {
    const bankCard = await prisma.bankCard.findFirst({
      where: { userId },
    });

    if (!bankCard) {
      return res
        .status(404)
        .json({ message: "No bank card found for this user" });
    }

    return res.status(200).json(bankCard);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch bank card" });
  }
};
