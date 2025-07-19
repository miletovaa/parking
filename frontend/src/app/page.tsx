'use client'

import { useMemo } from "react"
import { useTranslations } from "next-intl"
import { DateRangePicker } from "@heroui/date-picker"
import { Button } from "@heroui/button"
import { getLocalTimeZone, today } from "@internationalized/date"

export default function Home() {
	const todayDate = useMemo(() => today(getLocalTimeZone()), [])
  	const t = useTranslations('home')

	return (
		<div className="flex mt-48 items-center justify-center">
			<DateRangePicker 
				label={t('stay_duration_label')}
				description={t('stay_duration_description')}
				className="max-w-[284px]" 
				variant="underlined"
				minValue={todayDate}
				errorMessage={t('stay_duration_error')}
				isRequired
			/>
			<Button className="ml-4" variant="solid" color="primary">
				<span className="font-semibold">{t('submit')}</span>
			</Button>
		</div>
	)
}
