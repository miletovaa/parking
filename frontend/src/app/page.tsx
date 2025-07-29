'use client'

import { useMemo, useCallback, useEffect } from "react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date"
import { DateRangePicker } from "@heroui/date-picker"
import { Button } from "@heroui/button"
import { RangeValue } from "@heroui/react"

export default function Home() {
	const todayDate = useMemo(() => today(getLocalTimeZone()), [])
  	const t = useTranslations('home')

	const setDates = useCallback((range?: RangeValue<CalendarDate>) => {
		const dateFrom = range?.start?.toString() ?? todayDate.toString()
		const dateTo = range?.end?.toString() ?? todayDate.add({ days: 3 }).toString()

		localStorage.setItem('date_from', dateFrom)
		localStorage.setItem('date_to', dateTo)
	}, [])

	useEffect(() => {
		setDates()
	}, [])

	return (
		<form className="flex mt-48 items-center justify-center">
			<DateRangePicker
				label={t('stay_duration_label')}
				description={t('stay_duration_description')}
				className="max-w-[284px]" 
				variant="underlined"
				minValue={todayDate}
				errorMessage={t('stay_duration_error')}
				defaultValue={{
					start: todayDate,
					end: todayDate.add({ days: 3 }),
				}}
				onChange={(e) => e && setDates(e) }
				isRequired
			/>
			<Button as={Link} href="/reservation" className="ml-4" variant="solid" color="primary" type="submit">
				<span className="font-semibold">{t('submit')}</span>
			</Button>
		</form>
	)
}
