import Footer from "@module/Footer";
import Navbar from "@module/Navbar";
import { PropsWithChildren } from "react";

export default function DefaultLayout({ children }: PropsWithChildren) {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	);
}
