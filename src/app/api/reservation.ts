import { Reservation } from "@prisma/client";

export const createReservation = async (values: {
	dateFrom: Date;
	timeFrom: number;
	dateTo: Date;
	timeTo: number;
}): Promise<Reservation> => {
	const res = await fetch("/api/reservation/reserve", {
		body: JSON.stringify(values),
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const reservation = await res.json();
	return reservation;
};

export const getReservation = async (day: Date): Promise<Reservation[]> => {
	const res = await fetch(`/api/reservation/${day.toISOString()}`, {
		method: "get",
	});
	const reservations = await res.json();
	return reservations;
};
