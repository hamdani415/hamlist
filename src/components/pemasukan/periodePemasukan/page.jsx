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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/pemasukan/search?email=${email}&tanggalawal=${tanggalawal}&tanggalakhir=${tanggalakhir}`,{
           method : "GET",
            headers : {
                "x-api-key" : process.env.NEXT_PUBLIC_API_KEY
            }
        })
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
                <div className='flex gap-4  items-center border-b-2 border-blue-400 pb-2'>
                    <div className='px-2'>
                        <p>Tanggal awal</p>
                        <input type="date" className='border-1 md:text-lg sm:text-lg text-sm rounded-sm border-blue-400 p-1.5 text-blue-500' value={tanggalawal} onChange={handletanggalAwal} />
                    </div>
                    <div>
                        <p>Tanggal akhir</p>
                        <input type="date" className='border-1 md:text-lg sm:text-lg text-sm rounded-sm border-blue-400 p-1.5 text-blue-500' value={tanggalakhir} onChange={handletanggalAkhir} />
                    </div>
                    <div className='py-2 flex flex-col items-center'>
                        <button className='bg-blue-400 text-white font-semibold p-2 mt-6 rounded-lg w-full' onClick={handlecari} >Cari</button>
                    </div>
                </div>
            </div>
            <div className='pt-2 px-1'>
                {data.length === 0 && <p className='text-center text-slate-400 text-2xl font-bold italic pt-36'>Data tidak ditemukan</p>}
                {data?.map((item) => {
                    return (
                        <div key={item.id} className='border-b-2 border-blue-400 p-1 bg-blue-300 rounded-2xl mb-2'>
                            <div className='flex justify-between items-center p-2 text-sm sm:text-lg md:text-lg'>
                                <div className=' items-center'>
                                    <p className='font-semibold '>{item.tanggal.slice(0, 10)}</p>
                                    <p className='font-bold text-lg text-blue-700'>{item.pemasukan}</p>
                                </div>
                                <div className='flex gap-2 text-lg '>
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
