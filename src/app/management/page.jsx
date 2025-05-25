import Management from '@/components/management/page'
import { authUserSesion } from '@/libs/libs-auth'
import React from 'react'

const page = async () => {
  const user = await authUserSesion()
  return (
    <div>
      <Management email={user?.email} user={user}/>
    </div>
  )
}

export default page
