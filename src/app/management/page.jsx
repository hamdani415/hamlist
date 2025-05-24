import Tambahmanagement from '@/components/management/tambahdata/page'
import Tombolhapusmanagement from '@/components/management/tombolhapus/page'
import Tombolselesaimanagement from '@/components/management/tombolselesai/page'
import Tombolrisetmanagement from '@/components/management/tombolriset/page'
import React from 'react'

const page = async () => {
    const response = await fetch('https://backendmanagement-production.up.railway.app/api/v1/management')
    const { data } = await response.json()
    return (
        <div>
            <div className='flex justify-between p-4'>
                <h1 className='font-bold text-blue-400 text-2xl'>Task Management</h1>
                <div className='flex gap-2 items-center'>
                    <Tambahmanagement />
                    <Tombolrisetmanagement />
                </div>
            </div>
            {data.map((item) => {
                return (
                    <div key={item.id} >
                        {
                            item.status === 'belum' ? <div className='p-4 border-b-2 border-blue-400 bg-blue-300 rounded-2xl mb-2'>
                                <div className='flex items-center gap-2'>
                                    <p className='text-blue-600 font-bold'>{item.tanggal}</p>
                                    <p className='text-white font-bold w-full'>{item.pekerjaan}</p>
                                    <div className='flex gap-6 items-center'>
                                        <Tombolselesaimanagement pekerjaan={item.pekerjaan} jam={item.tanggal} id={item.id} />
                                    </div>
                                </div>
                            </div> :
                                <div className='p-4 border-b-2 border-slate-400 bg-slate-300 rounded-2xl mb-2'>
                                    <div className='flex justify-between items-center gap-2'>
                                        <p className='text-slate-600 font-bold'>{item.tanggal}</p>
                                        <p className='text-white font-bold w-full'>{item.pekerjaan}</p>
                                        <div className='flex gap-6 items-center'>
                                            <Tombolhapusmanagement id={item.id} />
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

export default page
