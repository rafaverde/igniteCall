import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  // Recupera o username do parametro da url
  const username = String(req.query.username);
  // Recupera a data do parametro da url
  const { year, month } = req.query;

  // Se não houver data, retorna erro
  if (!year || !month) {
    return res.status(400).json({ message: "Year or month not specified." });
  }

  // Instancia o usuário buscando no banco pelo username da url
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  // Retorna erro caso usuário não exista
  if (!user) {
    return res.status(400).json({ message: "User doesn't exist." });
  }

  // Retorna da tabela userTimeIntervals os dias em que o usuário tem disponibilidade nas semanas
  const availableWeekDays = await prisma.userTimeIntervals.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  });

  // Cria um array filtrando os dias da semana que não estão na lista availabeWeekDays
  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    return !availableWeekDays.some(
      (availableWeekDay) => availableWeekDay.week_day === weekDay
    );
  });

  return res.json({ blockedWeekDays, availableWeekDays });
}
