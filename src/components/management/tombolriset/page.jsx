"use client"
import { TrashIcon } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'


const Tombolrisetmanagement = () => {
    const router = useRouter()
      const handlehapus = async (e) => {
          e.preventDefault()
         if (confirm("apakah anda yakin")) {
           const respose = await fetch("https://backendmanagement-production.up.railway.app/api/v1/management-riset",{
               method : "DELETE" ,
                 headers: {
                   "Content-Type": "application/json"
               },
               body: JSON.stringify()
           })
           const hasil = await respose.json()
           if (hasil.status === 200) {
               console.log(hasil)
               alert('berhasil menghapus')
               router.refresh()
           }else{
               console.log(hasil);
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
