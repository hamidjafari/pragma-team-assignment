import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
import ReactCalendar from "react-calendar";
import { isSaturday, isSunday } from "date-fns";
import { ComponentProps } from "react";

export function Calendar(props: ComponentProps<typeof ReactCalendar>) {
	return (
		<ReactCalendar
			defaultView="month"
			minDate={new Date()}
			minDetail="month"
			tileDisabled={({ date, view }) =>
				view === "month" && (isSaturday(date) || isSunday(date))
			}
			{...props}
		/>
	);
}
