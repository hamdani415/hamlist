"use client"

import { useRouter } from "next/navigation"

const Tombolselesaimanagement = ({ pekerjaan, tanggal, id }) => {
    const router = useRouter()
    const handleselesai = async (e) => {
        e.preventDefault()
        const status = "selesai"
        const data = { pekerjaan, tanggal, status, id }
        const response = await fetch('http://localhost:7000/api/v1/management', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const hasil = await response.json()
        if(hasil.status === 200) {
            console.log(hasil)
            alert('okeh')
            router.refresh()
        
        } else {
            console.log(hasil)
            alert("ada yang eror")
        }


    }
    return (
        <div className="flex justify-center items-center text-center">
            <button onClick={handleselesai} className='bg-blue-600 text-white px-2 py-1 rounded-xl'>selesai</button>
        </div>
    )
}

export default Tombolselesaimanagement
