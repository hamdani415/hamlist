import Todolist from '@/components/todolist/page'
import { authUserSesion } from '@/libs/libs-auth'
import React from 'react'

const page = async() => {
  const user = await authUserSesion()
  return (
    <div>
      <Todolist email={user?.email} user={user}/>
    </div>
  )
}

export default page
