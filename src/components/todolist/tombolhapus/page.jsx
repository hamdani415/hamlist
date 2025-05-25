"use client"

import { TrashIcon } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const Tombolhapus = ({id}) => {
  const router = useRouter()
  const handlehapus = async (e) => {
    e.preventDefault()
    const data = {id}
    const response = await fetch('https://backendtodolist-production-7994.up.railway.app/api/v1/todolist', {
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
      <button onClick={handlehapus} className='text-red-500'><TrashIcon size={32} /></button>
    </div>
  )
}

export default Tombolhapus
