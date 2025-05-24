"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

const Tombolhapus = ({id}) => {
  const router = useRouter()
  const handlehapus = async (e) => {
    e.preventDefault()
    const data = {id}
    const response = await fetch('https://bakendtodolist-production.up.railway.app/api/v1/todolist', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const hasil = await response.json()
    if (hasil.status === 200) {
      console.log(hasil)
      alert('berhasil menghapus')
      router.refresh()
    }else{
      console.log(hasil);
      alert("ada kesalahan sistem")
    }
    
  }
  return (
    <div>
      <button onClick={handlehapus} className='bg-red-500 text-white px-2 py-1 rounded-xl'>hapus</button>
    </div>
  )
}

export default Tombolhapus
