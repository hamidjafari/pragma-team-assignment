import { useSession } from "next-auth/react";

export default function Navbar() {
	const { data } = useSession();

	return (
		<nav
			className={`flex w-full p-3 backdrop-blur shadow-2xl shadow-slate-100 fixed left-0 top-0 right-0 bg-white bg-opacity-70`}>
			<h3>Welcome {data?.user?.name}</h3>
		</nav>
	);
}
