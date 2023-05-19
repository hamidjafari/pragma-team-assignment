import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
import "./DatePicker.css";
import ReactDatePicker from "react-date-picker";
import { isSaturday, isSunday } from "date-fns";
import { ComponentProps } from "react";

export function DatePicker(props: ComponentProps<typeof ReactDatePicker>) {
	return (
		<ReactDatePicker
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
