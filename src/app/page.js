import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <div className='contener '>
        <div className='slider  justify-center items-center py-4 px-1.5'>
          <img src='/image/bgtodolist.jpg' width={750} alt='hamdani ganteng' className='rounded-xl' />
          <img src='/image/bgmanagement.jpg' width={750} alt='hamdani ganteng' className='rounded-xl' />
          <img src='/image/bgfinancial.jpg' width={750} alt='hamdani ganteng' className='rounded-xl' />
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <div className=' gap-4 w-full px-6 py-4 items-center rounded-2xl bg-blue-100 text-white'>
          <div className='flex justify-evenly '>
            <Link href='/todolist'  className='flex flex-col justify-center items-center text-blue-400 font-semibold text-lg' >
              <img className='rounded-xl' src='/image/icontodolist.jpg' width={120} height={200} alt='hamdani ganteng' />
              <p>ToDoList</p>
            </Link>
            <Link href='/management'  className='flex flex-col justify-center items-center text-blue-400 font-semibold text-lg' >
              <img className='rounded-xl' src='/image/iconmanager.jpg' width={120} height={200} alt='hamdani ganteng' />
              <p>Management</p>
            </Link>
          </div>
          <div className='flex justify-evenly pt-6'>
            <Link href='/financial' className='flex flex-col justify-center items-center text-blue-400 font-semibold text-lg' >
              <img className='rounded-xl' src='/image/iconfinancial.jpg' width={120} height={200} alt='hamdani ganteng' />
              <p>Financial</p>
            </Link>
            <Link href='/about'  className='flex flex-col justify-center items-center text-blue-400 font-semibold text-lg' >
              <img className='rounded-xl' src='/image/iconabout.jpg' width={120} height={200} alt='hamdani ganteng' />
              <p>About</p>
            </Link>
          </div>
      
        </div>
      </div>
    </div>
  )
}

export default page
