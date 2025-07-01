"use client"
import { ChartLineDownIcon, ChartLineUpIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

import React, { use, useEffect, useState } from 'react'

const FinancialComponents = ({ email }) => {
    const [totalpengeluaran, setTotalpengeluaran] = useState(0)
    const [totalpemasukan, setTotalpemasukan] = useState(0)
    const getPengeluaran = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/financial?email=${email}`)
        const result = await response.json()
        const total = result.reduce((acc, item) => acc + item.harga, 0)
        setTotalpengeluaran(total)
    }
    const getPemasukan = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/pemasukan?email=${email}`)
        const result = await response.json()
        const total = result.reduce((acc, item) => acc + item.harga, 0)
        setTotalpemasukan(total)
    }
    useEffect(() => {
        getPengeluaran()
        getPemasukan()
    }, [])
    const saldoSekarang = totalpemasukan - totalpengeluaran

    const rupiah = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })
    return (
        <div className='flex flex-col gap-4 p-8'>
            <Link href={'/financial/pengeluaran'} className=' border-red-400 p-2 border-2 rounded-2xl'>
                <p className='text-xl font-bold text-red-500'>PENGELUARAN</p>
                <ChartLineDownIcon className='text-red-500 w-full' size={150} />
                <p className='text-xl font-bold text-blue-400'>{rupiah.format(totalpengeluaran)}</p>
            </Link>
            <Link href={'/financial/pemasukan'} className=' border-green-400 p-2 border-2 rounded-2xl'>
                <p className='text-xl font-bold text-green-500'>PEMASUKAN</p>
                <ChartLineUpIcon className='text-green-500 w-full' size={150} />
                <p className='text-xl font-bold text-blue-400'>{rupiah.format(totalpemasukan)}</p>
            </Link>
            <div className='border-sky-400 p-2 border-2 rounded-2xl'>
                <p className='text-xl font-bold text-sky-500'>TOTAL SALDO:</p>
                <p className='text-xl font-bold text-yellow-500'>{rupiah.format(saldoSekarang)}</p>
            </div>
           
        </div>
    )
}

export default FinancialComponents
