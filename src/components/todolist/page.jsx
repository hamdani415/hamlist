"use client"
import Tambahtodolist from '@/components/todolist/tambahdata/page'
import Tombolhapus from '@/components/todolist/tombolhapus/page'
import Tombolriset from '@/components/todolist/tombolriset/page'
import Tombolselesai from '@/components/todolist/tombolselesai/page'
import React, { useEffect, useState } from 'react'

const Todolist = () => {
    const [data, setdata] = useState([])

    useEffect(() => {
        async function getdata() {
            const response = await fetch('https://bakendtodolist-production.up.railway.app/api/v1/todolist')
            const result = await response.json()
            setdata(result.data)
        }
        getdata()
    }, [])
    return (
        <div>
            <div className='flex justify-between p-4'>
                <h1 className='font-bold text-blue-400 text-2xl'>To Do List</h1>
                <div className='flex gap-2 items-center'>
                <Tambahtodolist />
                <Tombolriset/>
                </div>
            </div>
            {data.map((item) => {
                return (
                    <div key={item.id} >
                        {
                            item.status === 'belum' ? <div className='p-4 border-b-2 border-blue-400 bg-blue-300 rounded-2xl mb-2'>
                                <div className='flex justify-between items-center gap-2'>
                                    <p className='text-white font-bold w-full'>{item.pekerjaan}</p>
                                    <div className='flex gap-6 items-center'>
                                        <p className='text-blue-600 font-bold'>{item.jam}</p>
                                        <Tombolselesai pekerjaan={item.pekerjaan} jam={item.jam} id={item.id} />
                                    </div>
                                </div>
                            </div> :
                                <div className='p-4 border-b-2 border-slate-400 bg-slate-300 rounded-2xl mb-2'>
                                    <div className='flex justify-between items-center gap-2'>
                                        <p className='text-white font-bold w-full'>{item.pekerjaan}</p>
                                        <div className='flex gap-6 items-center'>
                                            <p className='text-slate-600 font-bold'>{item.jam}</p>
                                            <Tombolhapus id={item.id} />
                                        </div>
                                    </div>
                                </div>
                        }

                    </div>
                )
            })}

        </div>
    )
}

export default Todolist
