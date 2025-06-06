import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verifica se o método de chamada está correto
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  // Recupera o username do parametro da url
  const username = String(req.query.username);
  // Recupera a data do parametro da url
  const { date } = req.query;

  // Se não houver data, retorna erro
  if (!date) {
    return res.status(400).json({ message: "Date not provided." });
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

  // Aloca em string a data de referencia baseada na que vem no query.
  const referenceDate = dayjs(String(date));

  // Verifica se a data informada não é anterior a data atual.
  const isPastDate = referenceDate.endOf("day").isBefore(new Date());

  if (isPastDate) {
    return res.json({ possibleTimes: [], availability: [] });
  }

  // Busca no banco de dados a disponibilidade do usuário para o dia, caso não tenha, retorna array vazio.
  const userAvailability = await prisma.userTimeIntervals.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get("day"),
    },
  });

  if (!userAvailability) {
    return res.json({ possibleTimes: [], availability: [] });
  }

  // Pega na disponibilidade do usuário o intervalo de tempo que ele está disponível
  const { time_start_in_minutes, time_end_in_minutes } = userAvailability;
  const startHour = time_start_in_minutes / 60;
  const endHour = time_end_in_minutes / 60;

  // Cria uma array com esses intervalos, de 1 em 1 hora
  const possibleTimes = Array.from({ length: endHour - startHour }).map(
    (_, i) => {
      return startHour + i;
    }
  );

  // Busca nos agendamentos de um usuário específico, entre os horários definidos em startHour e endHour
  const blockedTimes = await prisma.scheduling.findMany({
    select: { date: true },
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate.set("hour", startHour).toDate(), // greater than or equal
        lte: referenceDate.set("hour", endHour).toDate(), // lower than or equal
      },
    },
  });

  // Filtra em possibleTimes todos os valores que não estão em blockedTimes e retorna um novo array
  const availableTimes = possibleTimes.filter((time) => {
    const isTimeBlocked = !blockedTimes.some(
      (blockedTime) => blockedTime.date.getHours() === time
    );

    const isTimeInPast = referenceDate.set("hour", time).isBefore(new Date());

    return !isTimeBlocked && !isTimeInPast;
  });

  return res.json({ possibleTimes, availableTimes });
}
