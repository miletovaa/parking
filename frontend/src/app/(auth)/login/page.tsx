'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authApi } from '@/api'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        const response = await authApi().login({ email, password })
        const { user, token } = response
        localStorage.setItem('token', token)
        console.log(user, user.role)
        // TODO: routing based on user role
    }

    const test = async () => {
        const result = await authApi().me()
        console.log(result)
    }

    useEffect(() => {
        test()
    }, [])

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-6">Login</h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 px-4 py-2 border rounded"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-6 px-4 py-2 border rounded"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Sign in
                </button>
            </form>
        </div>
    )
}