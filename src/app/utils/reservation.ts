import { Reservation } from "@prisma/client";
import {
	setHours,
	isBefore,
	areIntervalsOverlapping,
	isEqual,
	isSameDay,
	isAfter,
	addDays,
} from "date-fns";

/**
 * @returns string in case of error and true if everything's fine
 */
export function isTimeToValid(
	dateFrom: Date,
	hourFrom: number,
	dateTo: Date,
	hourTo: number
): true | string {
	const from = setHours(dateFrom, hourFrom);
	const to = setHours(dateTo, hourTo);
	if (isBefore(to, from) || isEqual(to, from)) {
		return "date to should be greater than date from";
	}

	if (isBefore(from, new Date())) {
		return "you cannot reserve into the past";
	}

	if (isAfter(dateTo, addDays(dateFrom, 1))) {
		return "reservation time cannot exceed from one day";
	}

	if (!isSameDay(from, to) && hourTo > 11) {
		return "you can't reserve the car longer than next day's 11am";
	}

	if (hourTo > 17) {
		return "you cannot reserve the car after 5pm";
	}

	if (hourFrom < 9) {
		return "you cannot reserve the car before 9am";
	}

	return true;
}

export const hasTimesOverlap = (
	dateFrom: Date,
	hourFrom: number,
	dateTo: Date,
	hourTo: number,
	reservations: Reservation[]
): boolean => {
	const inputFrom = setHours(dateFrom, hourFrom);
	const inputTo = setHours(dateTo, hourTo);

	return reservations.some((reservation) => {
		const reservationFrom = setHours(
			reservation.dateFrom,
			reservation.timeFrom
		);
		const reservationTo = setHours(reservation.dateTo, reservation.timeTo);
		return areIntervalsOverlapping(
			{
				end: inputTo,
				start: inputFrom,
			},
			{
				end: reservationTo,
				start: reservationFrom,
			}
		);
	});
};
