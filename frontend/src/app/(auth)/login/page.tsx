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
        <Card className="max-w-md mx-auto mt-20">
            <form onSubmit={handleSubmit(handleLogin)} >
                <CardHeader className="flex justify-center">
                    <h1 className="text-2xl font-bold">{t('login')}</h1>
                </CardHeader>
                <Divider />
                <CardBody className="space-y-3 py-8">
                    <Input
                        {...register('email')}
                        type="email"
				        variant="underlined"
                        placeholder={t('email_placeholder')}
                        errorMessage={t('email_error')}
                        isInvalid={!!errors.email}
                    />
                    <Input
                        {...register('password')}
                        type="password"
                        variant="underlined"
                        placeholder={t('password_placeholder')}
                        errorMessage={t('password_error')}
                        isInvalid={!!errors.password}
                    />
                </CardBody>
                <Divider />
                <CardFooter className="flex justify-end">
                    <Button color="primary" type="submit">
                        {t('sign_in_button')}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}