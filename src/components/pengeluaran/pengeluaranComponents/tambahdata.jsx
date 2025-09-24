"use client"
import { CheckFatIcon } from '@phosphor-icons/react'
import React, { useState } from 'react'

const Tambahfinancial = ({ email, user, getData }) => {
    const [pengeluaran, setpengeluaran] = useState('')
    const [harga, setharga] = useState('')
    const [tanggal, settanggal] = useState('')
    const [message, setMessage] = useState('')
    const [kategory, setkategory] = useState('')
    // const tanggal = new Date().toISOString().slice(0, 10)
    const [loading, setloading] = useState(false)
    const [open, setopen] = useState(false)




    const handletambahdata = async (e) => {
        e.preventDefault()
        setloading(true)
        const data = { tanggal: new Date(tanggal), pengeluaran, harga, email , kategory_id : kategory }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/financial`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const hasil = await response.json()
        // console.log(hasil)
        if (hasil.message === "berhasil") {
            alert('data berhasil di tambahkan')
            setpengeluaran('')
            setharga('')
            setopen(false)
            getData()
        } else if (hasil.errors && hasil.errors.length > 0) {
            setMessage(hasil.errors?.[0]?.msg)
        } else {
            setMessage("terjadi kesalahan")
        }
        setloading(false)
    }
    const handletanggal = (e) => {
        const val = e.target.value
        settanggal(val)
    }
    const handlepengeluaran = (e) => {
        setpengeluaran(e.target.value)
    }
    const handleharga = (e) => {
        const value = parseInt(e.target.value)
        setharga(value)
    }
    const handleKategory = (e) => {
        const value = parseInt(e.target.value)
        setkategory(value)
    }

    const handletombolopen = (e) => {
        e.preventDefault()
        if (!user) {
            alert('anda harus login terlebih dahulu')
            return
        } else {
            setopen(true)
        }
    }
    const handletombolclose = (e) => {
        e.preventDefault()
        setpengeluaran('')
        setharga('')
        setopen(false)
    }


    return (
        <div >
            <button onClick={handletombolopen} className='text-4xl font-bold text-green-500'>+</button>
            {open && (
                <div className=' md:top-20 sm:top-20  fixed right-0.5 w-full flex justify-center items-center'>
                    <div className='bg-green-300  rounded-xl md:w-2/4 sm:w-3/4 w-full mx-4 pb-8 mb-10 z-10 shadow-black shadow-xl'>
                        <h1 className='p-2 font-bold text-blue-500'>EXPENSES</h1>
                        <div className='p-4 '>
                            <div className=''>
                                <p className='text-white font-semibold'>TANGGAL</p>
                                <input type="date" className='bg-white md:px-8 sm:px-8 rounded-2xl w-full text-blue-500 font-semibold p-2' value={tanggal} onChange={handletanggal} />
                            </div>
                            <div className='py-4'>
                                <p className='text-white font-semibold'>PENGELUARAN</p>
                                <input type="text" className='w-full md:px-8 sm:px-8 text-blue-500 font-semibold p-2 border border-white rounded-2xl bg-white' placeholder='makan..' value={pengeluaran} onChange={handlepengeluaran} />
                            </div>
                            <div className='pb-4'>
                                <p className='text-white font-semibold'>KATEGORI</p>
                                <select onChange={handleKategory} className='w-full md:px-8 sm:px-8 text-blue-500 font-semibold p-2 border border-white rounded-2xl bg-white' name="" id="">
                                    <option value="">-Pilih kategori-</option>
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
                            </div>
                            <div className=''>
                                <p className='text-white font-semibold'>TOTAL</p>
                                <input placeholder='2000' className='bg-white md:px-8 sm:px-8 w-full rounded-2xl text-blue-500 font-semibold p-2' type="number" value={harga} onChange={handleharga} />
                                <p className='text-red-500 pt-2 md:px-8 sm:px-8'>{message}</p>

                            </div>
                        </div>
                        <div className='flex gap-2 pt-2 justify-center items-center px-4'>
                            <button className='bg-red-500 text-white font-semibold rounded-2xl p-2 w-1/3 md:w-1/4 sm:w-1/4' onClick={handletombolclose}>X</button>
                            <button className='bg-green-500 text-white font-semibold rounded-2xl p-2 w-1/3 md:w-1/4 sm:w-1/4 flex justify-center ' onClick={handletambahdata}
                                disabled={loading}>{loading ? <p>Menambahkan...</p> : <p><CheckFatIcon size={24} color='white' /></p>}</button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

export default Tambahfinancial
