"use client"
import Tambahtodolist from '@/components/todolist/todolistComponents/tambahdata'
import Tombolhapus from '@/components/todolist/todolistComponents/hapusdata'
import Tombolriset from '@/components/todolist/todolistComponents/risetdata'
import Tombolselesai from '@/components/todolist/todolistComponents/tombolselesai'
import React, { useEffect, useState } from 'react'

const Todolist = ({ email, user }) => {
    const [data, setdata] = useState([])
    const getData = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/todolist?email=${email}`, {
            method: "GET",
            headers: {
                "x-api-key": process.env.NEXT_PUBLIC_API_KEY
            }
        })
        const result = await response.json()
        setdata(result)
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div>
            <div className='flex justify-between  border-b-2 border-blue-400 p-3 pt-5'>
                <div className='flex gap-2 items-center'>
                    <h1 className='font-bold text-blue-400 text-2xl '>To Do List</h1>
                    <Tambahtodolist email={email} user={user} getData={getData} />
                </div>
                <div className='flex gap-2 items-center'>
                    <Tombolriset getData={getData} />
                </div>
            </div>
            <div className='py-2'>
                {data.length === 0 ? <p className='text-center text-slate-400 text-2xl font-bold italic pt-36'>Tidak ada data</p>
                    :
                    (data?.map((item) => {
                        return (
                            <div key={item.id} >
                                {
                                    item.status === 'belum' ? <div className='p-4 border-b-2 border-blue-400 bg-blue-300 rounded-2xl mb-2'>
                                        <div className='flex justify-between items-center gap-2'>
                                            <p className='text-white font-bold w-full'>{item.pekerjaan}</p>
                                            <div className='flex gap-6 items-center'>
                                                <p className='text-blue-600 font-bold'>{item.jam}</p>
                                                <Tombolselesai email={email} pekerjaan={item.pekerjaan} jam={item.jam} id={item.id} getData={getData} />
                                            </div>
                                        </div>
                                    </div> :
                                        <div className='p-4 border-b-2 border-slate-400 bg-slate-300 rounded-2xl mb-2'>
                                            <div className='flex justify-between items-center gap-2'>
                                                <p className='text-white font-bold w-full'>{item.pekerjaan}</p>
                                                <div className='flex gap-6 items-center'>
                                                    <p className='text-slate-600 font-bold'>{item.jam}</p>
                                                    <Tombolhapus id={item.id} getData={getData} />
                                                </div>
                                            </div>
                                        </div>
                                }

                            </div>
                        )
                    }))
                }
            </div>

        </div>
    )
}

export default Todolist
