import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export default function ReservationStepTwo({ proceed }: { proceed: () => void }) {
    const schema = z.object({
        name: z.string(),
        email: z.email(),
        password: z.string().min(4),
    }).required()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    })

    return (
        <form>
            step 2
        </form>
    )
}