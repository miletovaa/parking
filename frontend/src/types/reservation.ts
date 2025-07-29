type Step = number // todo: 1 | 2 | 3

type StepOneState = {
    datetime_from: any // TODO: type
    datetime_to: any // TODO: type
}

type StepTwoState = {
    license_plate: string
    price: number
    note?: string
} | null

type StepThreeState = {
    payment_method: string
    payment_status: 'pending' | 'success' | 'error' // TODO: add to BE
} | null

export type {
    Step,
    StepOneState,
    StepTwoState,
    StepThreeState
}
