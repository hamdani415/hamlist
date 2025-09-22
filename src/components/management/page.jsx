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
            <div className='flex justify-between  border-b-2 border-blue-400 p-3 pt-5'>
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
                        const tanggalFormated = new Date(item.tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
                        return (
                            <div key={item.id} >
                                {
                                    item.status === 'belum' ? <div className='p-4 border-b-2 flex items-center justify-between border-blue-400 bg-blue-300 rounded-2xl mb-2'>
                                        <p className='text-blue-600 font-bold'>{tanggalFormated}</p>
                                        <div className='flex gap-6 items-center'>
                                            <p className='text-white font-bold w-full'>{item.pekerjaan}</p>
                                            <Tombolselesaimanagement email={email} pekerjaan={item.pekerjaan} jam={item.tanggal} id={item.id} getData={getData} />
                                        </div>
                                    </div> :
                                        <div className='p-4 border-b-2 flex justify-between items-center border-slate-400 bg-slate-300 rounded-2xl mb-2'>
                                            <p className='text-slate-600 font-bold'>{tanggalFormated}</p>
                                            <div className='flex gap-6 items-center'>
                                                <p className='text-white font-bold w-full'>{item.pekerjaan}</p>
                                                <Tombolhapusmanagement id={item.id} getData={getData} />
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
