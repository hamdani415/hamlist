import PeriodePemasukan from '@/components/pemasukan/periodePemasukan/page'
import { authUserSesion } from '@/libs/libs-auth'
import React from 'react'

const page = async () => {
    const user = await authUserSesion()
  return (
    <div>
      <PeriodePemasukan email={user?.email}/>
    </div>
  )
}

export default page
