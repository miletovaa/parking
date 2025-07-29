'use client'
import { useState, useCallback } from "react"
import { Button } from "@heroui/react"

import { ReservationStoreProvider } from "@/providers/reservation-provider"
import ReservationStepOne from "./_components/Step1"
import ReservationStepTwo from "./_components/Step2"
import { Step } from "@/types/reservation"

export default function Reservation() {
    const [step, setStep] = useState<Step>(1)

    const proceed = () => {
        setStep((step) => step + 1)
    }

    const getStepComponent = useCallback(() => {
        switch (step) {
            case 2:
                return <ReservationStepTwo proceed={proceed} />
            // case 3:
            //     return <ReservationStepThree/>
            default:
                return <ReservationStepOne proceed={proceed} />
        }
    }, [step])

    return (
        <ReservationStoreProvider>
            <div className="max-w-md mx-auto mt-20 w-full flex justify-center space-x-4">
                {[1, 2, 3].map(s => (
                    <Button 
                        key={s}
                        color={s === step ? "primary" : "secondary"}
                        variant="bordered"
                        onPress={() => { if (s < step) setStep(s) }}
                        isDisabled={s > step}
                        isIconOnly
                    >
                        {s}
                    </Button>
                ))}
            </div>
            {getStepComponent()}
        </ReservationStoreProvider>
    )
}