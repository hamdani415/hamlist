"use client"

import { TrashIcon } from '@phosphor-icons/react'
import React from 'react'

const Tombolhapusmanagement = ({id , getData}) => {
   const handlehapus = async (e) => {
    e.preventDefault()
    const data = {id}
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/management`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const hasil = await response.json()
    if (hasil.statuscode === 200) {
      alert('berhasil menghapus')
      getData()
    }else{
      alert("ada kesalahan sistem")
    }

    
  }
  return (
    <div>
      <button onClick={handlehapus} className='bg-red-500 text-white px-2 py-1 rounded-xl'><TrashIcon size={32} /></button>
    </div>
  )
}

export default Tombolhapusmanagement
