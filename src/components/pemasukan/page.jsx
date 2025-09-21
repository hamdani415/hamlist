"use client"
import Hapusdata from '@/components/pemasukan/pemasukanComponents/hapusdata'
import Tambahfinancial from '@/components/pemasukan/pemasukanComponents/tambahdata'
import React, { useEffect, useState } from 'react'
import RisetData from '@/components/pemasukan/pemasukanComponents/risetdata'
import { useRouter } from 'next/navigation'

const Pemasukan = ({ email, user }) => {
    const [data, setdata] = useState([])
    const [total, settotal] = useState(0)
    const router = useRouter()
    const tanggal = new Date()
    const formatTanggal = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(tanggal)

    const getData = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/pemasukan?email=${email}`)
        const result = await response.json()
        setdata(result)
        const totalharga = result.reduce((acc, item) => acc + item.harga, 0)
        settotal(totalharga)
    }

    useEffect(() => {
        getData()
    }, [])

    const rupiah = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })

    return (
        <div>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-blue-400 text-2xl pt-2 px-2'>PEMASUKAN</h1>
                <p className='pt-2 px-2 text-lg font-semibold text-green-500'>{formatTanggal}</p>
            </div>
            <div className='items-center md:p-4 sm:p-2 p-2 py-3 mb-2 justify-between gap-4 flex border-b-2 border-blue-400'>
                <div className='flex gap-2 items-center'>
                    <p className='text-sm text-blue-400'>TOTAL:</p>
                    <p className='p-1 rounded-md border-2 border-blue-400 bg-blue-500 text-white font-bold'>{rupiah.format(total)}</p>
                    <Tambahfinancial email={email} user={user} getData={getData} />
                </div>
                <div className='flex gap-2 items-center'>
                    <RisetData email={email} getData={getData} />
                    <button className='p-2 px-4  rounded-xl bg-blue-400 border-2 border-blue-400 text-white font-semibold' onClick={() => router.push('/financial/pemasukan/periode')}>Filter</button>
                </div>
            </div>
            <div className='px-1'>
                {data?.length === 0 ? <p className='text-center text-2xl font-bold text-slate-400 italic pt-36'>Tidak Ada Data</p> :
                    (data?.map((item) => {
                        return (
                            <div key={item.id} className='border-b-2 border-blue-400 p-1 bg-blue-300 rounded-2xl mb-2'>
                                <div className='flex justify-between items-center p-2 text-sm sm:text-lg md:text-lg'>
                                    <div className='gap-4 items-center'>
                                        <p className='font-semibold '>{item.tanggal.slice(0, 10)}</p>
                                        <p className='font-bold text-lg text-blue-700'>{item.pemasukan}</p>
                                    </div>
                                    <div className='flex gap-2 '>
                                        <p className='font-bold text-white'>{rupiah.format(item.harga)}</p>
                                        <Hapusdata id={item.id} getData={getData} />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    )
                }
            </div>
        </div>
    )
}

export default Pemasukan
