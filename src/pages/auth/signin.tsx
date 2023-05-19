import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { signIn, getProviders } from "next-auth/react";
import { Inter } from "next/font/google";
import { authOptions } from "../api/auth/[...nextauth]";
import Image from "next/image";
import { Card } from "@element/Card";
import { Button } from "@element/Button";

const inter = Inter({ subsets: ["latin"] });

export default function SignIn({
	providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-4 lg:p-24 bg-slate-100 ${inter.className}`}>
			<Card className="lg:flex flex-col lg:flex-row-reverse">
				<Image
					src="/safebox.jpg"
					alt="safe box image"
					width="500"
					height="500"
					className="rounded-xl"
				/>
				<div className="flex flex-col space-y-5 p-8 text-center">
					<h3 className="text-2xl pb-4 border-b border-b-stone-200">
						Welcome!
					</h3>
					{Object.values(providers).map((provider) => (
						<Button
							className="rounded-lg"
							intent="bordered"
							key={provider.name}
							onClick={() => signIn(provider.id)}>
							Sign in with {provider.name}
						</Button>
					))}
				</div>
			</Card>
		</main>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerSession(context.req, context.res, authOptions);

	if (session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	const providers = await getProviders();

	return {
		props: { providers: providers ?? [] },
	};
}
