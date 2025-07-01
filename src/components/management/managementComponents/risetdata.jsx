"use client"
import { TrashIcon } from '@phosphor-icons/react'



const Tombolrisetmanagement = ({email , getData}) => {
        const handlehapus = async (e) => {
          e.preventDefault()
          const data = {email}
         if (confirm("apakah anda yakin")) {
           const respose = await fetch(`${process.env.NEXT_PUBLIC_API}/management`,{
               method : "DELETE" ,
                 headers: {
                   "Content-Type": "application/json"
               },
               body: JSON.stringify(data)
           })
           const hasil = await respose.json()
           if (hasil.statuscode === 200) {
               alert('berhasil menghapus')
               getData()
           }else{
               alert("ada kesalahan sistem")
           }
         }else{
           null
         }
      }
    return (
      <div className='flex justify-center items-center text-center'>
        <button onClick={handlehapus} className='bg-red-500 text-white px-2 py-1 rounded-xl'><TrashIcon size={32} /></button>
      </div>
    )
  }

export default Tombolrisetmanagement
