import { prisma } from "../../db";

export const getProfile = async (req, res) => {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  const userId = parseInt(req.query.id as string);
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true, receivedDonations: true, sentDonations: true },
  });

  if (!user) return res.status(404).json({ error: "User not found" });

  return res.status(200).json(user.profile);
};
