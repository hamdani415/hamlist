import PeriodePengeluaran from '@/components/pengeluaran/periode/page'
import { authUserSesion } from '@/libs/libs-auth'
import React from 'react'

const page = async () => {
    const user = await authUserSesion()
 
  return (
    <div>
      <PeriodePengeluaran email={user?.email}/>
    
    </div>
  )
}

export default page
