"use client"
import React from 'react'
import { EnvelopeSimpleIcon, InstagramLogoIcon  } from '@phosphor-icons/react'

const page = () => {
  return (
    <div className='p-4'>
      <p className='font-bold text-blue-500'>
        Website ini di buat untuk mengatur tugas-tugas sehari-hari, mengatur finansial dan membuat jadwal untuk hari yang akan datang.
      </p>
      <h1 className='font-bold text-red-500 pt-2'>PENTING!!</h1>
      <p>Semua data yang di masukan di website ini bakal masuk ke database dari website ini, jadi jika menurut anda data yang di masukan bakal penting, maka jangan gunakan website ini,
        karena kami bisa melihat semua isi dari database ini. namun jika menurut anda data yang anda masukan tidak penting, maka anda bisa menggunakan website ini. Data hanya bisa di lihat oleh anda dan pemilik website.
      </p>
      <p className='py-4'>
        Website ini dibuat oleh <b>hamdani ganteng</b>
      </p>
      <div className='pt-2'>
        <a href='https://www.instagram.com/muhamad_hamdani27/' className='flex gap-2 items-center hover:text-blue-500 italic'><InstagramLogoIcon size={32} /> @muhamad_hamdani27</a>
        <a href='mailto:danih4757@gmail.com' className='flex gap-2 items-center hover:text-blue-500 italic'><EnvelopeSimpleIcon size={32} />@danih4757@gmail.com</a>
        
      </div>
    </div>
  )
}

export default page
