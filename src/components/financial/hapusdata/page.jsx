"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

const Hapusdata = ({id}) => {
  const router = useRouter()
  const handlehapus = async (e) => {
    e.preventDefault()
    const data = {id}
    const response = await fetch('http://localhost:4000/api/v1/financial', {
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
      <button onClick={handlehapus} className='text-white font-bold bg-red-500 px-1 rounded-full'>X</button>
    </div>
  )
}

export default Hapusdata
