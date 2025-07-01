"use client"
import React, { use, useEffect, useState } from 'react'
import Hapusdata from '@/components/pemasukan/pemasukanComponents/hapusdata'
// import { useRouter } from 'next/navigation'

const PeriodePemasukan = ({ email }) => {
    const [tanggalawal, settanggalawal] = useState('')
    const [tanggalakhir, settanggalakhir] = useState('')
    const [data, setdata] = useState([])
    const [total, settotal] = useState(0)
    // const router = useRouter()
    const handlecari = async () => {
        // e.preventDefault()
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/pemasukan/search?email=${email}&tanggalawal=${tanggalawal}&tanggalakhir=${tanggalakhir}`)
        const result = await response.json()
        setdata(result)
        const totalharga = result.reduce((acc, item) => acc + item.harga, 0)
        settotal(totalharga)
        if (result.length === 0) {
            alert('data tidak ditemukan')
        }
    }


    const handletanggalAwal = (e) => {
        settanggalawal(e.target.value)
    }
    const handletanggalAkhir = (e) => {
        settanggalakhir(e.target.value)
    }
    const rupiah = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })

    return (
        <div>
            <div>
                <div className='flex justify-between items-center'>
                    <h1 className='font-bold text-blue-400 text-2xl p-2'>Pilih Periode</h1>
                    <div className=''>
                        <p className='text-blue-400 px-2'>Total Pemasukan: </p>
                        <p className='font-bold bg-blue-400 text-white p-2 rounded-xl'>{rupiah.format(total)}</p>
                    </div>
                </div>
                <div className='flex gap-4 justify-center items-center'>
                    <div>
                        <p>Tanggal awal</p>
                        <input type="date" className='border-1 border-blue-400 p-1.5 text-blue-500' value={tanggalawal} onChange={handletanggalAwal} />
                    </div>
                    <div>
                        <p>Tanggal akhir</p>
                        <input type="date" className='border-1 border-blue-400 p-1.5 text-blue-500' value={tanggalakhir} onChange={handletanggalAkhir} />
                    </div>
                </div>
                <div className='p-2 mt-2 flex flex-col gap-2'>
                    <button className='bg-blue-400 p-2 rounded-lg w-full' onClick={handlecari} >Cari</button>
                </div>
            </div>
            <div>
                {data?.map((item) => {
                    return (
                        <div key={item.id} className='border-b-2 border-blue-400 bg-blue-300 rounded-2xl mb-2'>
                            <div className='flex justify-between items-center p-4'>
                                <div className='flex gap-4 items-center'>
                                    <p className='font-bold '>{item.tanggal.slice(0, 10)}</p>
                                    <p className='font-bold text-lg text-blue-700'>{item.pemasukan}</p>
                                </div>
                                <div className='flex gap-2 '>
                                    <p className='font-bold text-white'>{rupiah.format(item.harga)}</p>
                                    <Hapusdata email={email} id={item.id} getData={handlecari} />
                                </div>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

export default PeriodePemasukan
