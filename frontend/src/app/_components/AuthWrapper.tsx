'use client'
import { useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useMeStore } from '@/providers/me-store-provider'
import { authApi } from '@/api'
import Loader from './Loader'

interface Props { children: ReactNode }

export default function AuthWrapper({ children }: Props) {
    const me = useMeStore((s) => s.me)
    const setMe = useMeStore((s) => s.update)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        async function init() {
            if (!me) {
                const token = localStorage.getItem('token')
                if (token) {
                    try {
                        const fetched = await authApi().me()
                        setMe(fetched)
                    } catch {
                        router.push('/login')
                        return
                    }
                } else {
                    router.push('/login')
                    return
                }
            }
            setLoading(false)
        }
        init()
    }, [me, setMe, router])

    if (loading) return <Loader />
    return <>{children}</>
}