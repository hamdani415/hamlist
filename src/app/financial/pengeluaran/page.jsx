import Financial from '@/components/pengeluaran/page'
import { authUserSesion } from '@/libs/libs-auth'
import React from 'react'

const page = async () => {
  const user = await authUserSesion()

  return (
    <div>
      <Financial email={user?.email} user={user}/>
    </div>
  )
}

export default page
