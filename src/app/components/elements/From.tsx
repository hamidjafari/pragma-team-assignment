import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentProps } from "react";
import {
	useForm,
	UseFormProps,
	FormProvider,
	UseFormReturn,
	FieldValues,
	SubmitHandler,
	useFormContext,
} from "react-hook-form";
import { ZodSchema, TypeOf } from "zod";

interface UseZodFormProps<T extends ZodSchema<any>>
	extends UseFormProps<TypeOf<T>> {
	schema: T;
}

export const useZodForm = <T extends ZodSchema<any>>({
	schema,
	...formConfig
}: UseZodFormProps<T>) => {
	return useForm({
		...formConfig,
		resolver: zodResolver(schema),
	});
};

interface FieldErrorProps {
	name?: string;
}

export function FieldError({ name }: FieldErrorProps) {
	const {
		formState: { errors },
	} = useFormContext();

	if (!name) return null;

	const error = errors[name];

	if (!error) return null;

	return (
		<div className="text-sm text-red-500 font-bold">
			{error.message?.toString()}
		</div>
	);
}

interface Props<T extends FieldValues = any>
	extends Omit<ComponentProps<"form">, "onSubmit"> {
	form: UseFormReturn<T>;
	onSubmit: SubmitHandler<T>;
	fieldsetClassName?: string;
}

export const Form = <T extends FieldValues>({
	form,
	onSubmit,
	children,
	fieldsetClassName,
	...props
}: Props<T>) => {
	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} {...props}>
				<fieldset
					className={fieldsetClassName}
					disabled={form.formState.isSubmitting}>
					{children}
				</fieldset>
			</form>
		</FormProvider>
	);
};
