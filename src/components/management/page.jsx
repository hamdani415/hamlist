"use client"
import Tambahmanagement from '@/components/management/managementComponents/tambahdata'
import Tombolhapusmanagement from '@/components/management/managementComponents/hapusdata'
import Tombolselesaimanagement from '@/components/management/managementComponents/tombolselesai'
import Tombolrisetmanagement from '@/components/management/managementComponents/risetdata'
import { use, useEffect, useState } from 'react'

const Management = ({ email, user }) => {
    const [data, setdata] = useState([])

    const getData = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/management?email=${email}`)
        const result = await response.json()
        setdata(result)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <div className='flex justify-between p-4'>
                <h1 className='font-bold text-blue-400 text-2xl'>Task Management</h1>
                <div className='flex gap-2 items-center'>
                    <Tambahmanagement getData={getData} email={email} user={user} />
                    <Tombolrisetmanagement getData={getData} email={email} />
                </div>
            </div>
            <div>
                {data.length === 0 ? <p className='text-center text-slate-400 text-2xl font-bold italic pt-36'>Tidak ada data</p>
                    :
                    (data?.map((item) => {
                        return (
                            <div key={item.id} >
                                {
                                    item.status === 'belum' ? <div className='p-4 border-b-2 border-blue-400 bg-blue-300 rounded-2xl mb-2'>
                                        <div className='flex items-center gap-2'>
                                            <p className='text-blue-600 font-bold'>{item.tanggal}</p>
                                            <p className='text-white font-bold w-full'>{item.pekerjaan}</p>
                                            <div className='flex gap-6 items-center'>
                                                <Tombolselesaimanagement email={email} pekerjaan={item.pekerjaan} jam={item.tanggal} id={item.id} getData={getData} />
                                            </div>
                                        </div>
                                    </div> :
                                        <div className='p-4 border-b-2 border-slate-400 bg-slate-300 rounded-2xl mb-2'>
                                            <div className='flex justify-between items-center gap-2'>
                                                <p className='text-slate-600 font-bold'>{item.tanggal.slice(0, 10)}</p>
                                                <p className='text-white font-bold w-full'>{item.pekerjaan}</p>
                                                <div className='flex gap-6 items-center'>
                                                    <Tombolhapusmanagement id={item.id} getData={getData} />
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

export default Management
