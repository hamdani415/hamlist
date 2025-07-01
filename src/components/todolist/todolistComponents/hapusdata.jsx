"use client"

import { TrashIcon } from '@phosphor-icons/react'
import React from 'react'

const Tombolhapus = ({id , getData}) => {
  const handlehapus = async (e) => {
    e.preventDefault()
    const data = {id }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/todolist`, {
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
      <button onClick={handlehapus} className='text-red-500'><TrashIcon size={32} /></button>
    </div>
  )
}

export default Tombolhapus
