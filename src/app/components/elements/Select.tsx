import "./Select.css";
import ReactSelect from "react-select";
import { ComponentProps } from "react";

interface Option<T> {
	id: number;
	value: T;
	label: string;
}

export function Select<T>(
	props: ComponentProps<typeof ReactSelect<Option<T>>>
) {
	return (
		<ReactSelect
			{...props}
			className="react-select"
			classNamePrefix="react-select"
		/>
	);
}
