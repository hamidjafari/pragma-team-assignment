import { PrismaClient, Reservation } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { hasTimesOverlap, isTimeToValid } from "@util/reservation";

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Reservation | string>
) {
	if (req.method !== "POST") return;

	const { timeTo, timeFrom } = req.body as Reservation;
	const dateFrom = new Date(req.body.dateFrom);
	const dateTo = new Date(req.body.dateTo);

	const session = await getServerSession(req, res, authOptions);

	if (!session) return;

	const errorMessage = isTimeToValid(dateFrom, timeFrom, dateTo, timeTo);

	if (typeof errorMessage === "string")
		return res.status(403).send(errorMessage);

	const todayAndTomorrowReservations = await prisma.reservation.findMany({
		where: {
			dateFrom: {
				gte: dateFrom.toISOString(),
				lte: dateTo.toISOString(),
			},
		},
	});

	if (
		hasTimesOverlap(
			dateFrom,
			timeFrom,
			dateTo,
			timeTo,
			todayAndTomorrowReservations
		)
	)
		return res.status(403).send("spot already reserved");

	const newReservation = await prisma.reservation.create({
		data: {
			dateFrom,
			dateTo,
			timeFrom,
			timeTo,
			userId: session.user.id,
		},
	});

	res.status(200).json(newReservation);
}
