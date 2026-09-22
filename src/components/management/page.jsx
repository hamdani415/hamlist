"use client"

import Tambahmanagement from '@/components/management/managementComponents/tambahdata'
import Tombolhapusmanagement from '@/components/management/managementComponents/hapusdata'
import Tombolselesaimanagement from '@/components/management/managementComponents/tombolselesai'
import Tombolrisetmanagement from '@/components/management/managementComponents/risetdata'
import { useEffect, useState } from 'react'

const Management = ({ email, user }) => {
    const [data, setdata] = useState([])

    const getData = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API}/management?email=${email}`,
            {
                method: "GET",
                headers: {
                    "x-api-key": process.env.NEXT_PUBLIC_API_KEY
                }
            }
        )

        const result = await response.json()
        setdata(result)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>

            {/* HEADER */}
            <div className="
                flex items-center justify-between
                border-b-2 border-blue-400
                px-3 py-4
            ">

                <div className="flex items-center gap-2">
                    <h1 className="
                        font-bold
                        text-blue-400
                        text-lg sm:text-2xl
                    ">
                        Task Management
                    </h1>

                    <Tambahmanagement
                        getData={getData}
                        email={email}
                        user={user}
                    />
                </div>

                <Tombolrisetmanagement
                    getData={getData}
                    email={email}
                />

            </div>


            {/* DATA */}
            <div className="py-2">

                {data.length === 0 ? (

                    <p className="
                        text-center
                        text-slate-400
                        text-xl
                        font-bold italic
                        pt-36
                    ">
                        Tidak ada data
                    </p>

                ) : (

                    data.map((item) => {

                        const tanggalFormated = new Date(
                            item.tanggal
                        ).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })

                        const belum = item.status === 'belum'

                        return (
                            <div
                                key={item.id}
                                className={`
                                    mx-0 mb-2
                                    p-4
                                    rounded-2xl
                                    border-b-2
                                    ${
                                        belum
                                            ? 'bg-blue-300 border-blue-400'
                                            : 'bg-slate-300 border-slate-400'
                                    }
                                `}
                            >

                                {/* TANGGAL */}
                                <p
                                    className={`
                                        font-bold
                                        text-sm
                                        mb-3
                                        ${
                                            belum
                                                ? 'text-blue-600'
                                                : 'text-slate-600'
                                        }
                                    `}
                                >
                                    {tanggalFormated}
                                </p>


                                {/* PEKERJAAN + TOMBOL */}
                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-3
                                ">

                                    <p className="
                                        text-white
                                        font-bold
                                        text-sm sm:text-base
                                        leading-snug
                                        min-w-0
                                        break-words
                                    ">
                                        {item.pekerjaan}
                                    </p>

                                    {belum ? (

                                        <Tombolselesaimanagement
                                            email={email}
                                            pekerjaan={item.pekerjaan}
                                            jam={item.tanggal}
                                            id={item.id}
                                            getData={getData}
                                        />

                                    ) : (

                                        <Tombolhapusmanagement
                                            id={item.id}
                                            getData={getData}
                                        />

                                    )}

                                </div>

                            </div>
                        )
                    })
                )}

            </div>

        </div>
    )
}

export default Management