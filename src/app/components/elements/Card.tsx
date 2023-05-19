import { VariantProps, cva } from "cva";
import clsx from "clsx";
import { ComponentProps } from "react";

const cardStyles = cva("flex  p-4 bg-white", {
	variants: {
		intent: {
			bordered: "border border-slate-300",
			elevated: "shadow-xl shadow-gray-300",
		},
		size: {
			small: "rounded-lg",
			large: "rounded-2xl",
		},
	},
	defaultVariants: {
		intent: "bordered",
		size: "large",
	},
});

export interface Props
	extends ComponentProps<"div">,
		VariantProps<typeof cardStyles> {}

export function Card({ intent, size, className, ...props }: Props) {
	return (
		<div className={clsx(cardStyles({ intent, size }), className)} {...props} />
	);
}
