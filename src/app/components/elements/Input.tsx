import { FieldError } from "@element/From";
import clsx from "clsx";
import { VariantProps, cva } from "cva";
import { ComponentProps, forwardRef } from "react";
import { IconType } from "react-icons";

const inputStyles = cva("flex items-center space-x-1 p-2 border-none", {
	variants: {
		intent: {
			solid:
				"bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 w-full rounded-md px-4 py-2 disabled:opacity-60 disabled:bg-gray-500 disabled:bg-opacity-20",
		},
	},
	defaultVariants: {
		intent: "solid",
	},
});

interface Props
	extends ComponentProps<"input">,
		VariantProps<typeof inputStyles> {
	label?: string;
	inputClassName?: string;
	labelClassName?: string;
	Icon?: IconType;
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
	{
		label,
		type = "text",
		intent,
		className,
		inputClassName,
		labelClassName,
		Icon,
		...props
	},
	ref
) {
	return (
		<div className="flex-col">
			<label className={clsx(inputStyles({ intent }), className)}>
				{label && (
					<div
						className={clsx(
							"font-medium text-gray-800 dark:text-gray-200 mb-1",
							labelClassName
						)}>
						{label}
					</div>
				)}
				{Icon && <Icon />}
				<input
					className={clsx(
						"focus:outline-none bg-transparent w-full",
						inputClassName
					)}
					type={type}
					ref={ref}
					{...props}
				/>
			</label>
			<FieldError name={props.name} />
		</div>
	);
});
