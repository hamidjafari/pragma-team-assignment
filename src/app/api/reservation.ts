import { Reservation, User } from "@prisma/client";
import { ApiCacheKeys, GetMethod } from "types/api/getMethod";

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

export const getReservation: GetMethod<
	Array<Reservation & { user: User }>
> = async (day: Date) => {
	const res = await fetch(`/api/reservation/${day.toISOString()}`, {
		method: "get",
	});
	const reservations = await res.json();
	return reservations;
};
getReservation.uniqueKey = ApiCacheKeys.GET_RESERVATION_OF_DAY;
