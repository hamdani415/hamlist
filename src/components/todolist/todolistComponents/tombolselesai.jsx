"use client"

import { CheckFatIcon } from "@phosphor-icons/react"


const Tombolselesai = ({ pekerjaan, jam, id, email, getData }) => {
    const handleselesai = async (e) => {
        e.preventDefault()
        const status = "selesai"
        const data = { pekerjaan, jam, status, id, email }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/todolist`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const hasil = await response.json()
        if (hasil.statuscode === 200) {
            alert('okeh')
            getData()

        } else {
            alert("ada yang eror")
        }


    }
    return (
        <div className="flex justify-center items-center text-center">
            <button onClick={handleselesai} className='bg-blue-600 text-white px-2 py-1 rounded-xl'><CheckFatIcon size={32} /></button>
        </div>
    )
}

export default Tombolselesai
