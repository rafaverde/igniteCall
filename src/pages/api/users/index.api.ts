import { prisma } from "@/lib/prisma";
import { setCookie } from "nookies";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { name, username } = req.body;

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (userExists) {
    return res.status(400).json({ message: "Username already in use." });
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  });

  setCookie({ res }, "@ignitecall-v1:userId", user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7days
    path: "/", //All routes can access
  });

  return res.status(201).json(user);
}
