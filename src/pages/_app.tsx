import "@styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { QueryClient, QueryClientProvider } from "react-query";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<{ session: Session }> & {
	Component: NextPageWithLayout;
};

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider session={session}>
				{getLayout(<Component {...pageProps} />)}
			</SessionProvider>
		</QueryClientProvider>
	);
}
