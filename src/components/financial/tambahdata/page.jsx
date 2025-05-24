"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Tambahfinancial = () => {
    const [pengeluaran, setpengeluaran] = useState('')
    const [harga, setharga] = useState('')
    const tanggal = new Date().toISOString().slice(0, 10)
    const [loading, setloading] = useState(false)
    const [open, setopen] = useState(false)
    const router = useRouter()


    const handletambahdata = async (e) => {
        e.preventDefault()
        setloading(true)
        const data = {tanggal , pengeluaran, harga}
        const response = await fetch('http://localhost:4000/api/v1/financial', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const hasil = await response.json()
        if (hasil.message === "berhasil") {
            console.log(hasil)
            alert('data berhasil di tambahkan')
            setpengeluaran('')
            setharga('')
            setopen(false)
            router.refresh()

        } else {
            console.log(hasil)
            alert("gagal menambahkan data")
        }
        setloading(false)
        router.refresh()
        

    }
    const handlepengeluaran = (e) => {
        setpengeluaran(e.target.value)
    }
    const handleharga = (e) => {
        const value = parseInt(e.target.value)
        setharga(value)
    }

    const handletombolopen = (e) => {
        e.preventDefault()
        setopen(true)
    }
    const handletombolclose = (e) => {
        e.preventDefault()
        setpengeluaran('')
        setharga('')
        setopen(false)
    }




    return (
        <div>
            <button onClick={handletombolopen} className='text-3xl font-bold text-blue-400'>+</button>
            {open && (
                <div className=' fixed right-0.5 w-full flex justify-center items-center'>
                    <div className='bg-green-300  top-20 h-52 rounded-xl md:w-2/4 sm:w-3/4 w-full mx-4 mt-32  z-10 shadow-black shadow-xl'>
                        <h1 className='p-2 font-bold text-blue-500'>TO DO LIST</h1>
                        <div className='flex md:justify-center gap-2 sm:justify-center sm:gap-4 md:gap-4 justify-evenly items-center p-4 '>
                            <div className='flex flex-col justify-center items-center'>
                                <p className='text-white font-semibold'>PENGELUARAN</p>
                                <input type="text" className='w-full md:px-8 sm:px-8 text-blue-500 font-semibold p-2 border border-white rounded-2xl bg-white' placeholder='makan..' value={pengeluaran} onChange={handlepengeluaran} />
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <p className='text-white font-semibold'>JAM</p>
                                <input placeholder='2000' className='bg-white md:px-8 sm:px-8 rounded-2xl text-blue-500 font-semibold p-2' type="number" value={harga} onChange={handleharga} />
                            </div>
                        </div>
                        <div className='flex gap-2 pt-2 justify-center items-center px-4'>
                            <button className='bg-red-500 text-white font-semibold rounded-2xl p-2 w-1/3 md:w-1/4 sm:w-1/4' onClick={handletombolclose}>BATAL</button>
                            <button className='bg-green-500 text-white font-semibold rounded-2xl p-2 w-1/3 md:w-1/4 sm:w-1/4' onClick={handletambahdata}
                                disabled={loading}>{loading ? <p>Menambahkan...</p> : <p>TAMBAH</p>}</button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

export default Tambahfinancial
