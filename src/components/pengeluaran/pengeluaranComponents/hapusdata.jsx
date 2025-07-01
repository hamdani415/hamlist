"use client"

import { TrashIcon } from '@phosphor-icons/react'

import React from 'react'

const Hapusdata = ({id , getData}) => {

  const handlehapus = async (e) => {
    e.preventDefault()
    const data = {id}
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/financial`, {
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
    <div className='flex justify-center items-center text-center'>
      <button onClick={handlehapus} className='text-red-500'><TrashIcon size={32} /></button>
    </div>
  )
}

export default Hapusdata
