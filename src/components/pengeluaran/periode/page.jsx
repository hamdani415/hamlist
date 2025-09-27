"use client"
import React, { use, useEffect, useState } from 'react'
import Hapusdata from '../pengeluaranComponents/hapusdata'
// import { useRouter } from 'next/navigation'

const PeriodePengeluaran = ({ email }) => {
    const [tanggalawal, settanggalawal] = useState('')
    const [tanggalakhir, settanggalakhir] = useState('')
    const [data, setdata] = useState([])
    const [total, settotal] = useState(0)
    const [kategory_id, setkategory_id] = useState('')
    // const router = useRouter()
    const handlecari = async () => {
        // e.preventDefault()
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/financial/search?email=${email}&tanggalawal=${tanggalawal}&tanggalakhir=${tanggalakhir}&kategory_id=${kategory_id}`, {
            method: "GET",
            headers: {
                "x-api-key": process.env.NEXT_PUBLIC_API_KEY
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

    const handleCategory = (e) => {
        const value = e.target.value
        setkategory_id(value)
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
                    <h1 className='font-bold text-blue-400 text-2xl p-2'>Filter</h1>
                    <div className='p-2'>
                        <p className='text-blue-400 px-2'>Total Pengeluaran: </p>
                        <p className='font-bold bg-blue-400 text-white p-2 rounded-xl'>{rupiah.format(total)}</p>
                    </div>
                </div>
                <div className='md:flex sm:flex  items-center   border-b-2 border-blue-400 pb-2 md:pb-0 sm:pb-0'>
                    <div className='flex gap-2 px-3 md:mb-6 sm:mb-6 items-center'>
                        <div className='' >
                            <p>Tanggal awal</p>
                            <input type="date" className='border-1 rounded-sm  border-blue-400 p-1.5 px-3 text-blue-500' value={tanggalawal} onChange={handletanggalAwal} />
                        </div>
                        <div>
                            <p>Tanggal akhir</p>
                            <input type="date" className='border-1  rounded-sm border-blue-400 p-1.5 px-3 text-blue-500' value={tanggalakhir} onChange={handletanggalAkhir} />
                        </div>
                    </div>
                    <div className='flex gap-2 md:p-0 sm:p-0 p-2 px-3 justify-between items-center'>
                        <select onChange={handleCategory} className='w-full md:px-8 sm:px-8 text-blue-500 font-semibold p-2 border border-blue-400 rounded-lg  bg-white' name="" id="">
                            <option value="">Semua</option>
                            <option value="1">Makanan & Minuman pokok</option>
                            <option value="2">Makanan & Minuman jajan</option>
                            <option value="3">Transportasi</option>
                            <option value="4">Tagihan</option>
                            <option value="5">Kesehatan</option>
                            <option value="6">Pendidikan</option>
                            <option value="7">Belanja</option>
                            <option value="8">Tabungan/Investasi</option>
                            <option value="9">Hiburan</option>
                            <option value="10">Lain-lain</option>
                        </select>
                        <div className='px-2 flex items-center flex-col gap-2'>
                            <button className='bg-blue-400 p-2 font-semibold text-white rounded-lg w-full' onClick={handlecari} >Cari</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='px-1 mt-2'>
                {data.length === 0 && <p className='text-center text-slate-400 text-2xl font-bold italic pt-36'>Data tidak ditemukan</p>}
                {data?.map((item) => {
                    return (
                        <div key={item.id} className='border-b-2 border-blue-400 p-1 bg-blue-300 rounded-2xl mb-2'>
                            <div className='flex justify-between items-center sm:text-lg p-2 text-sm md:text-lg'>
                                <div className='gap-4 items-center'>
                                    <p className='font-semibold '>{item.tanggal.slice(0, 10)}</p>
                                    <p className='font-bold text-lg text-blue-700'>{item.pengeluaran}</p>
                                </div>
                                <div className='flex gap-2 text-lg'>
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

export default PeriodePengeluaran
