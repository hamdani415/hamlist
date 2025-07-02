"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const Headercomoponent = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleClick = (e) => {
        e.preventDefault()
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isOpen && !e.target.closest('.hamdaniganteng')) {
                setIsOpen(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    })

    return (
        <div className='bg-blue-500 p-4 w-full justify-between flex items-center'>
            <Link href='/' className='text-3xl text-white font-bold'>HAMLIST  <span className='text-sm font-stretch-50% font-normal text-black'>V3.2</span></Link>
            <div className='flex gap-2 items-center'>
                {!user && (
                    <div>
                        <Link className='text-white font-bold' href='/api/auth/signin'>login</Link>
                    </div>
                )
                }
                <button onClick={handleClick} className='flex flex-col p-2 gap-2'>
                    <p className='border-b-3 border-white w-8'></p>
                    <p className='border-b-3 border-white w-8'></p>
                    <p className='border-b-3 border-white w-8'></p>
                </button>
            </div>
            {isOpen && (
                <div className='hamdaniganteng absolute right-4 top-16 bg-blue-200 py-8 text-black p-4 shadow-md rounded-md  md:w-1/5 sm:w-1/4 w-1/2 z-10'>
                    <ul className='space-y-4 justify-center items-center text-center text-blue-500'>
                        <li className='font-bold p-2 hover:scale-105 hover:bg-blue-100 bg-white rounded-xl'> <a href="/">HOME</a></li>
                        {user && <li className='font-bold p-2 hover:scale-105 hover:bg-blue-100 bg-white rounded-xl'> <a href="/profile">PROFILE</a></li>}
                        <li className='font-bold p-2 hover:scale-105 hover:bg-blue-100 bg-white rounded-xl'> <a href="/todolist">TO DO LIST</a></li>
                        <li className='font-bold p-2 hover:scale-105 hover:bg-blue-100 bg-white rounded-xl'> <a href="/management">MANAGEMENT</a></li>
                        <li className='font-bold p-2 hover:scale-105 hover:bg-blue-100 bg-white rounded-xl'> <a href="/financial">FINANCIAL</a></li>
                        <li className='font-bold p-2 hover:scale-105 hover:bg-blue-100  bg-white rounded-xl'> <a href="/about">ABOUT</a></li>
                    </ul>

                </div>
            )}
        </div>
    )
}

export default Headercomoponent
