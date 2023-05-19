import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
	const { data } = useSession();

	return (
		<nav
			className={`flex w-full p-3 backdrop-blur shadow-2x fixed left-0 top-0 right-0  bg-opacity-70 justify-between`}>
			<h3>Welcome {data?.user?.name}</h3>
			<h2 className="cursor-pointer" onClick={() => signOut()}>
				Sign Out
			</h2>
		</nav>
	);
}
