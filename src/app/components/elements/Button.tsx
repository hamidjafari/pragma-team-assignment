import { ButtonOrLink, ButtonOrLinkProps } from "@element/ButtonOrLink";
import { VariantProps, cva } from "cva";
import clsx from "clsx";

const buttonStyles = cva(
	"flex items-center justify-center px-8 py-4 rounded-2xl focus:outline-none cursor-pointer",
	{
		variants: {
			intent: {
				primary: "bg-blue-500 hover:bg-blue-600 text-white",
				secondary:
					"bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 ",
				danger: "bg-red-500 hover:bg-red-600 text-white ",
				bordered:
					"bg-transparent border border-slate-300 hover:border-slate-500 text-gray-700",
			},
			fullWidth: {
				true: "w-full",
			},
			loading: {
				true: "cursor-not-allowed text-opacity-50",
			},
		},
		defaultVariants: {
			intent: "primary",
		},
	}
);

export interface Props
	extends ButtonOrLinkProps,
		VariantProps<typeof buttonStyles> {}

export function Button({
	intent,
	fullWidth,
	loading,
	className,
	...props
}: Props) {
	return (
		<ButtonOrLink
			className={clsx(buttonStyles({ intent, fullWidth, loading }), className)}
			{...props}
			disabled={props.disabled || !!loading}
		/>
	);
}
