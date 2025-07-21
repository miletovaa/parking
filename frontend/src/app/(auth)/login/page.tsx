'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { authApi } from '@/api'
import { LoginPayload } from '@/types/auth'
import { useMeStore } from '@/providers/me-store-provider'
import { Button, Input, Divider, Card, CardHeader, CardBody, CardFooter } from '@heroui/react'

export default function LoginPage() {
    const t = useTranslations('auth')
    const router = useRouter()
    const setMe = useMeStore((s) => s.update)

    const schema = z.object({
        email: z.email(),
        // TODO: adjust password validation for prod
        password: z.string().min(4),
    }).required()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    })

    const handleLogin = useCallback(async (data: LoginPayload) => {
        const response = await authApi().login(data)
        const { user, token } = response

        setMe(user)
        localStorage.setItem('token', token)

        router.push('/')
        // TODO: or to profile page if present active reservations
    }, [router])

    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <Card className="max-w-md mx-auto mt-20 flex flex-col space-y-6 py-6">
                <CardHeader className="flex justify-center">
                    <h1 className="text-2xl font-bold">{t('login')}</h1>
                </CardHeader>
                <CardBody className="space-y-3 py-2 px-6 text-xl">
                    <Input
                        {...register('email')}
                        type="email"
                        variant="underlined"
                        color="primary"
                        size="lg"
                        label={t('email_label')}
                        errorMessage={t('email_error')}
                        isInvalid={!!errors.email}
                    />
                    <Input
                        {...register('password')}
                        type="password"
                        variant="underlined"
                        color="primary"
                        size="lg"
                        label={t('password_label')}
                        errorMessage={t('password_error')}
                        isInvalid={!!errors.password}
                    />
                </CardBody>
                <CardFooter className="flex justify-center">
                    <Button color="primary" type="submit">
                        <span className="font-semibold uppercase px-6">{t('sign_in_button')}</span>
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}