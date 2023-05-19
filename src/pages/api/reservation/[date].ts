import { PrismaClient, Reservation } from "@prisma/client";
import { setHours } from "date-fns";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Reservation[]>
) {
	const { date } = req.query;

	if (typeof date !== "string") return;

	const reservations = await prisma.reservation.findMany({
		where: {
			dateFrom: {
				lte: setHours(new Date(date), 23).toISOString(),
				gte: setHours(new Date(date), 0).toISOString(),
			},
			dateTo: {
				lte: setHours(new Date(date), 23).toISOString(),
				gte: setHours(new Date(date), 0).toISOString(),
			},
		},
		include: {
			user: true,
		},
	});

	res.status(200).json(reservations);
}
