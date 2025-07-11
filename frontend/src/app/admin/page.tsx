'use client'

import { useEffect } from 'react'
import { use } from 'react'
import { parkingApi } from '@/api'

export default async function AdminDashboard() {

    const parkings = use(parkingApi().list())

    useEffect(() => {
        console.log(parkings);
    }, [parkings]);
    return (
        <>AdminDashboard</>
    )
}