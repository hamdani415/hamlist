"use client"
import { useRouter } from 'next/navigation'


const Tombolrisetmanagement = () => {
    const router = useRouter()
      const handlehapus = async (e) => {
          e.preventDefault()
         if (confirm("apakah anda yakin")) {
           const respose = await fetch("http://localhost:7000/api/v1/management-riset",{
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
        <button onClick={handlehapus} className='bg-red-500 text-white px-2 py-1 rounded-xl'>Reset</button>
      </div>
    )
  }

export default Tombolrisetmanagement
