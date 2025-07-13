'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { authApi } from '@/api'
import { LoginPayload } from '@/types/auth'
import { useMeStore } from '@/providers/me-store-provider'

export default function LoginPage() {
    const router = useRouter()
    const setMe = useMeStore((s) => s.update)

    const schema = z.object({
        email: z.email(),
        // TODO: adjust password validation for prod
        password: z.string().min(4),
    })

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
        <div className="text-black flex min-h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit(handleLogin)} className="bg-white p-8 rounded shadow w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-6">Login</h1>

                <input 
                    {...register('email')}
                    type="email"
                    placeholder="Email"
                    className="w-full mt-4 px-4 py-2 border rounded"
                    required
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}

                <input
                    {...register('password')} 
                    type="password"
                    placeholder="Password"
                    className="w-full mt-4 px-4 py-2 border rounded"
                    required
                />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white mt-6 py-2 rounded hover:bg-blue-700"
                >
                    Sign in
                </button>
            </form>
        </div>
    )
}