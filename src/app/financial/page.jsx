import FinancialComponents from '@/components/financialComponents/page'
import { authUserSesion } from '@/libs/libs-auth'
import Link from 'next/link'
import React from 'react'

const page = async () => {
  const user = await authUserSesion()
  return (
    <div>
     <FinancialComponents email={user?.email}/>
    </div>
  )
}

export default page
