"use client"
import { CheckFatIcon, TrashIcon } from '@phosphor-icons/react'
import React, { useState } from 'react'

const Tambahmanagement = ({ email, user, getData }) => {
    const [pekerjaan, setpekerjaan] = useState('')
    const [tanggal, settanggal] = useState('')
    const [loading, setloading] = useState(false)
    const [message, setMessage] = useState('')
    const [open, setopen] = useState(false)



    const handletambahdata = async (e) => {
        e.preventDefault()
        setloading(true)
        const status = 'belum'
        const data = { pekerjaan, tanggal : new Date(tanggal), status, email }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/management`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const hasil = await response.json()
        if (hasil.message === "berhasil") {
            alert('data berhasil di tambahkan')
            setopen(false)
            setpekerjaan('')
            settanggal('')
            setopen(false)

        } else {
            setMessage(hasil.errors?.[0]?.msg)
        }
        setloading(false)
        getData()


    }
    const handlepekerjaan = (e) => {
        setpekerjaan(e.target.value)
    }
    const handletanggal = (e) => {
        settanggal(e.target.value)
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
        setpekerjaan('')
        settanggal('')
        setopen(false)
    }




    return (
        <div>
            <button onClick={handletombolopen} className='text-3xl font-bold text-blue-400'>+</button>
            {open && (
                <div className=' fixed right-0.5 w-full flex justify-center items-center'>
                    <div className='bg-green-300  rounded-xl md:w-2/4 sm:w-3/4 w-full mx-4 mt-20 pb-8 z-10 shadow-black shadow-xl'>
                        <h1 className='p-2 font-bold text-blue-500'>TO DO LIST</h1>
                        <div className='p-4 '>
                            <div className=''>
                                <p className='text-white font-semibold'>AKTIVITAS</p>
                                <input type="text" className='w-full md:px-8 sm:px-8 text-blue-500 font-semibold p-2 border border-white rounded-2xl bg-white' placeholder='mau melakukan apa?' value={pekerjaan} onChange={handlepekerjaan} />
                            </div>
                            <div className='pt-4'>
                                <p className='text-white font-semibold'>TANGGAL</p>
                                <input placeholder='00.00' className='bg-white md:px-8 sm:px-8 rounded-2xl w-full text-blue-500 font-semibold p-2' type="date" value={tanggal} onChange={handletanggal} />
                                <p className='text-red-500 pt-2 md:px-8 sm:px-8'>{message}</p>
                            </div>
                        </div>
                        <div className='flex gap-2 pt-2 justify-center items-center px-4'>
                            <button className='bg-red-500 text-white font-semibold rounded-2xl p-2 w-1/3 md:w-1/4 sm:w-1/4' onClick={handletombolclose}>X</button>
                            <button className='bg-green-500 text-white font-semibold rounded-2xl p-2 w-1/3 md:w-1/4 sm:w-1/4 flex justify-center items-center' onClick={handletambahdata}
                                disabled={loading}>{loading ? <p>Menambahkan...</p> : <p><CheckFatIcon size={20} /></p>}</button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

export default Tambahmanagement
