import { ComponentProps } from "react";
import Link from "next/link";

export type ButtonOrLinkProps = ComponentProps<"button"> & ComponentProps<"a">;

export function ButtonOrLink({ href, ...props }: ButtonOrLinkProps) {
	const isLink = typeof href !== "undefined";
	const ButtonOrLink = isLink ? "a" : "button";

	const content = <ButtonOrLink {...props} />;

	if (isLink) {
		return <Link href={href}>{content}</Link>;
	}

	return content;
}
