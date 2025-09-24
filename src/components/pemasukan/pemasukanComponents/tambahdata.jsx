"use client"
import { CheckFatIcon } from '@phosphor-icons/react'
import React, { useState } from 'react'

const Tambahfinancial = ({ email, user, getData }) => {
    const [pemasukan, setpemasukan] = useState('')
    const [harga, setharga] = useState('')
    const [tanggal, settanggal] = useState('')
    const [message, setMessage] = useState('')
    // const tanggal = new Date().toISOString().slice(0, 10)
    const [loading, setloading] = useState(false)
    const [open, setopen] = useState(false)




    const handletambahdata = async (e) => {
        e.preventDefault()
        setloading(true)
        const data = { tanggal: new Date(tanggal), pemasukan, harga, email }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/pemasukan`, {
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
            setpemasukan('')
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
    const handlepemasukan = (e) => {
        setpemasukan(e.target.value)
    }
    const handleharga = (e) => {
        const value = parseInt(e.target.value)
        setharga(value)
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
        setpemasukan('')
        setharga('')
        setopen(false)
    }


    return (
        <div>
            <button onClick={handletombolopen} className='text-4xl font-bold text-green-500'>+</button>
            {open && (
                <div className=' fixed md:top-1/5 sm:top-1/5 right-0.5 w-full flex justify-center items-center'>
                    <div className='bg-green-300  rounded-xl md:w-2/4 sm:w-3/4 w-full mx-4 pb-8 mt-10 z-10 shadow-black shadow-xl'>
                        <h1 className='p-2 font-bold text-blue-500'>INCOME</h1>
                        <div className='p-4 '>
                            <div className=''>
                                <p className='text-white font-semibold'>TANGGAL</p>
                                <input type="date" className='bg-white md:px-8 sm:px-8 rounded-2xl w-full text-blue-500 font-semibold p-2' value={tanggal} onChange={handletanggal} />
                            </div>
                            <div className='py-4'>
                                <p className='text-white font-semibold'>PEMASUKAN</p>
                                <input type="text" className='w-full md:px-8 sm:px-8 text-blue-500 font-semibold p-2 border border-white rounded-2xl bg-white' placeholder='makan..' value={pemasukan} onChange={handlepemasukan} />
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
