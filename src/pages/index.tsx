import { useSession, signIn, signOut } from "next-auth/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const { data: session, status } = useSession();
	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
			<h1>{status}</h1>
			{session ? (
				<>
					Signed in as {session?.user?.name} <br />
					<button onClick={() => signOut()}>Sign out</button>
				</>
			) : (
				<>
					Not signed in <br />
					<button onClick={() => signIn()}>Sign in</button>
				</>
			)}
		</main>
	);
}
