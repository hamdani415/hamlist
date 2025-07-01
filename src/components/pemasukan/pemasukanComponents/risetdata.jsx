"use client"
import React from 'react'
import { TrashIcon } from '@phosphor-icons/react'

const RisetData = ({email , getData}) => {
    const handleRiset = async (e) => {
        e.preventDefault()
        const data = {email}
        if(confirm("apakah anda yakin untuk menghapus semua data pemasukan?")){
            
            const  response = await fetch(`${process.env.NEXT_PUBLIC_API}/pemasukan`, {
                method : "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(data)
            })
            const hasil = await response.json()
            if (hasil.statuscode === 200) {
                alert('berhasil menghapus')
                getData()
            }else{
                alert("ada kesalahan sistem")
            }
        }else{
            null}
    }
  return (
    <div className='justify-center items-center flex'>
      <button className='text-red-500' onClick={handleRiset}><TrashIcon size={32} /></button>
    </div>
  )
}

export default RisetData
