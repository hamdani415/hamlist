import { authUserSesion } from '@/libs/libs-auth'
import Link from 'next/link'

const page = async () => {
    const user = await authUserSesion()
    return (
        <div className='flex flex-col justify-center items-center gap-4 py-8 bg-blue-200 rounded-2xl m-8'>
                <div>
                    <img src={user?.image} alt="hamdani ganteng" width={100} height={100} className='rounded-full' />
                </div>
            <div className='w-full md:w-1/2 sm:w-1/2 p-4'>
                <div>
                    <div>
                        <p className='font-bold text-blue-500'>Username</p>
                        <p>{user?.name}</p>
                    </div>
                    <div className='py-4'>
                        <p className='font-bold text-blue-500'>Email</p>
                        <p>{user?.email}</p>
                    </div>
                    <Link href="/api/auth/signout" className='bg-blue-500 text-white p-2 rounded-md'>Keluar</Link>
                </div>
            </div>
        </div>
    )
}

export default page
