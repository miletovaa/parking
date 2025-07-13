'use client'

import { useMemo } from "react";
import { DateRangePicker } from "@heroui/date-picker"
import { Button } from "@heroui/button"
import { getLocalTimeZone, today } from "@internationalized/date";

export default function Home() {
	const todayDate = useMemo(() => today(getLocalTimeZone()), [])

	return (
		<div className="flex mt-48 items-center justify-center">
			<DateRangePicker 
				label="Stay duration" 
				description="Choose a date range for your reservation"
				className="max-w-[284px]" 
				variant="underlined"
				minValue={todayDate}
				isRequired
			/>
			<Button className="ml-4" variant="solid" color="primary">
				Submit
			</Button>
		</div>
	)
}
