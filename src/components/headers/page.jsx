import React from 'react'
import Headercomoponent from './headercomoponent/page'
import { authUserSesion } from '@/libs/libs-auth'

const Header = async () => {
    const user = await authUserSesion()
    console.log(user);
    
  return (
    <div>
      <Headercomoponent user={user}/>
    </div>
  )
}

export default Header
