import { VariantProps, cva } from "cva";
import clsx from "clsx";
import { ComponentProps } from "react";

const cardStyles = cva(
	"flex items-center justify-center p-4 rounded-2xl bg-white",
	{
		variants: {
			intent: {
				bordered: "border border-slate-300",
				elevated: "shadow-xl shadow-gray-300",
			},
		},
		defaultVariants: {
			intent: "bordered",
		},
	}
);

export interface Props
	extends ComponentProps<"div">,
		VariantProps<typeof cardStyles> {}

export function Card({ intent, className, ...props }: Props) {
	return <div className={clsx(cardStyles({ intent }), className)} {...props} />;
}
