'use client'
import { useCallback, useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useReservationStore } from '@/providers/reservation-provider'
import { StepOneState } from '@/types/reservation'
import { Input, Button, Card, CardHeader, CardBody, CardFooter, DateInput } from '@heroui/react'
import { useTranslations } from 'next-intl'
import { parseDate, toCalendarDateTime, CalendarDateTime, CalendarDate, today, getLocalTimeZone } from "@internationalized/date"

export default function ReservationStepOne({ proceed }: { proceed: () => void }) {
    const t = useTranslations('reservation')
    
    const setReservationStore = useReservationStore((store) => store.update)

    const [defaultDateFrom, setDefaultDateFrom] = useState<CalendarDate>(today(getLocalTimeZone()))
    const [defaultDateTo, setDefaultDateTo] = useState<CalendarDate>(today(getLocalTimeZone()).add({ days: 3 }))

    const schema = z.object({
        datetime_from: z.custom<CalendarDateTime>(),
        datetime_to: z.custom<CalendarDateTime>(),
        license_plate: z.string().min(3, { message: t('license_plate_required') }),
    }).required()

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    })

    const handleStepOne = useCallback((data: StepOneState) => {
        console.log(data)
        setReservationStore(data)
        proceed()
    }, [])

    useEffect(() => {
        const from = localStorage.getItem('date_from')
        const to = localStorage.getItem('date_to')
        if (from) setDefaultDateFrom(parseDate(from))
        if (to) setDefaultDateTo(parseDate(to))
    }, [])

    return (
        <form onSubmit={handleSubmit(handleStepOne)}>
            <Card className="max-w-md mx-auto mt-4 flex flex-col space-y-6 py-6">
                <CardHeader className="flex justify-center">
                    <h1 className="text-2xl font-bold">{t('reservation_information')}</h1>
                </CardHeader>
                <CardBody className="space-y-3 py-2 px-6 text-xl flex">
                    <span className="text-secondary text-xs text-center">
                        ...short parking info
                    </span>

                    <div>
                        <span className="text-primary/80 uppercase font-bold">{t('from')}</span>
                        <Controller
                            name="datetime_from"
                            control={control}
                            defaultValue={toCalendarDateTime(defaultDateFrom)}
                            render={({ field }) => (
                                <DateInput
                                    {...field}
                                    granularity="minute"
                                    variant="underlined"
                                    color="primary"
                                    size="lg"
                                    onChange={field.onChange}
                                    value={field.value}
                                    isInvalid={!!errors.datetime_from}
                                    errorMessage={errors.datetime_from?.message}
                                />
                            )}
                        />
                    </div>

                    <div>
                        <span className="text-primary/80 uppercase font-bold">{t('to')}</span>
                        <Controller
                            name="datetime_to"
                            control={control}
                            defaultValue={toCalendarDateTime(defaultDateTo)}
                            render={({ field }) => (
                                <DateInput
                                    {...field}
                                    granularity="minute"
                                    variant="underlined"
                                    color="primary"
                                    size="lg"
                                    onChange={field.onChange}
                                    value={field.value}
                                    isInvalid={!!errors.datetime_to}
                                    errorMessage={errors.datetime_to?.message}
                                />
                            )}
                        />
                    </div>

                    <div>
                        <span className="text-primary/80 uppercase font-bold">{t('license_plate')}</span>
                        <Controller
                            name="license_plate"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    variant="underlined"
                                    color="primary"
                                    size="lg"
                                    placeholder={t('license_plate_placeholder')}    
                                    onChange={field.onChange}
                                    value={field.value}
                                    isInvalid={!!errors.license_plate}
                                    errorMessage={errors.license_plate?.message}
                                />
                            )}
                        />
                    </div>

                    <span className="text-secondary text-xs text-center">
                        ...calculated price
                    </span>
                </CardBody>
                <CardFooter className="flex justify-center">
                    <Button type="submit" color="primary">
                        <span className="font-semibold uppercase px-6">{t('continue')}</span>
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}