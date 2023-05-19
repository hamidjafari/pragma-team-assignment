import { Button } from "@element/Button";
import { Calendar } from "@element/Calendar";
import { Card } from "@element/Card";
import { DatePicker } from "@element/DatePicker";
import { Form, useZodForm } from "@element/From";
import DefaultLayout from "@layout/DefaultLayout";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import Image from "next/image";
import { ReactElement } from "react";
import { date, number, object } from "zod";
import { NextPageWithLayout } from "./_app";
import { authOptions } from "./api/auth/[...nextauth]";
import { Select } from "@element/Select";
import { addDays } from "date-fns";
import {
	RESERVATION_FROM__HOURS,
	RESERVATION_TO__HOURS,
} from "@constant/reservation";
import { createReservation, getReservation } from "@api/reservation";
import { useQuery } from "react-query";

const inter = Inter({ subsets: ["latin"] });

const newNoteSchema = object({
	dateFrom: date(),
	timeFrom: number().min(9).max(16).optional(),
	dateTo: date().optional(),
	timeTo: number().min(10).max(17).optional(),
});

const Home: NextPageWithLayout = () => {
	const form = useZodForm({
		schema: newNoteSchema,
		defaultValues: {
			dateFrom: new Date(),
		},
	});

	const { data: reservations } = useQuery(
		[getReservation.uniqueKey, form.watch("dateFrom")],
		() => getReservation(form.watch("dateFrom"))
	);

	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between  ${inter.className}`}>
			<div className="w-full flex flex-col items-center p-5 bg-blue-500">
				<Image src="/car.webp" alt="car travel" width="400" height="400" />
				<Card className="w-full border-none p-3 justify-start" size="large">
					<Form
						className="w-full"
						fieldsetClassName="flex w-full space-x-4 items-stretch"
						form={form}
						onSubmit={async ({ dateFrom, dateTo, timeFrom, timeTo }) => {
							if (!dateFrom || !dateTo || !timeFrom || !timeTo) return;
							await createReservation({ dateFrom, dateTo, timeFrom, timeTo });
							form.reset();
						}}>
						<p className="self-center">from:</p>
						<DatePicker
							value={form.watch("dateFrom")}
							onChange={(date) => form.setValue("dateFrom", date)}
							className="flex-1"
						/>
						<div className="flex-1">
							<Select<number>
								{...form.register("timeFrom")}
								placeholder="from"
								options={RESERVATION_FROM__HOURS.map((hour) => ({
									id: hour,
									value: hour,
									label: "" + hour,
								}))}
								isSearchable={false}
								getOptionLabel={(option) => option.label}
								onChange={(option) => form.setValue("timeFrom", option?.value)}
							/>
						</div>
						<p className="self-center">to:</p>
						<DatePicker
							className="flex-1"
							value={form.watch("dateTo")}
							onChange={(date) => form.setValue("dateTo", date)}
							minDate={form.watch("dateFrom")}
							maxDate={addDays(form.watch("dateFrom"), 1)}
						/>
						<div className="flex-1">
							<Select<number>
								{...form.register("timeTo")}
								placeholder="to"
								options={RESERVATION_TO__HOURS.map((hour) => ({
									id: hour,
									value: hour,
									label: "" + hour,
								}))}
								isSearchable={false}
								getOptionLabel={(option) => option.label}
								onChange={(option) => form.setValue("timeTo", option?.value)}
							/>
						</div>
						<Button>submit</Button>
					</Form>
				</Card>
			</div>
			<div className="flex p-5 items-start w-full space-x-8">
				<Card intent="elevated">
					<Calendar onClickDay={(date) => form.setValue("dateFrom", date)} />
				</Card>
				<div className="flex-col space-y-3">
					{reservations?.map((reservation) => (
						<div
							className="rounded-xl bg-slate-500 px-3 py-1 text-slate-100 text font-bold"
							key={
								reservation.user.id
							}>{`${reservation.user.name} - ${reservation.timeFrom} → ${reservation.timeTo}`}</div>
					))}
				</div>
			</div>
		</main>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerSession(context.req, context.res, authOptions);

	if (!session) {
		return {
			redirect: {
				destination: "/auth/signin",
				permanent: false,
			},
		};
	}

	return {
		props: {
			session,
		},
	};
}
