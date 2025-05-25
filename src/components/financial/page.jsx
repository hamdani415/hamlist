"use client"
import Hapusdata from '@/components/financial/hapusdata/page'
import Tambahfinancial from '@/components/financial/tambahdata/page'
import React, { useEffect, useState } from 'react'

const Financial =  ({email , user}) => {
    const [data, setdata] = useState([])
    const [total, settotal] = useState(0)

    useEffect(() => {
        async function getdata() {
            const response = await fetch(`https://backendfinancial-production-4126.up.railway.app/api/v1/financial?email=${email}`)
            const result = await response.json()
            setdata(result.data)
            const totalharga = result.data.reduce((acc, item) => acc + item.harga, 0)
            settotal(totalharga)
        }
        getdata()
    }, [])
    const rupiah = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' })
   
    return (
        <div>
            <div className='flex justify-between items-center p-4'>
                <h1 className='font-bold text-blue-400 text-2xl'>FINANCIAL</h1>
                <div className='flex gap-4 items-center'>
                    <Tambahfinancial email={email} user={user} />
                    <div>
                        <p className='text-sm text-blue-400'>TOTAL :</p>
                        <p className='p-1 rounded-md border-2 border-blue-400 bg-blue-500 text-white font-bold'>{rupiah.format(total)}</p>
                    </div>
                </div>
            </div>
            {data.map((item) => {
                return (
                    <div key={item.id} className='border-b-2 border-blue-400 bg-blue-300 rounded-2xl mb-2'>
                        <div className='flex justify-between items-center p-4'>
                            <div className='flex gap-4 items-center'>
                                <p className='font-bold '>{item.tanggal}</p>
                                <p className='font-bold text-lg text-blue-700'>{item.pengeluaran}</p>
                            </div>
                            <div className='flex gap-2 '>
                                <p className='font-bold text-white'>{rupiah.format(item.harga)}</p>
                                <Hapusdata id={item.id} />
                            </div>
                        </div>
                    </div>
                )
            })
            }
        </div>
    )
}

export default Financial
