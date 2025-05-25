import { authUserSesion } from '@/libs/libs-auth'
import Link from 'next/link'

const page = async () => {
    const user = await authUserSesion()
    return (
        <div>
            <p>profilenya ginni dlu programer males ngoding</p>
            <img src={user?.image} alt="hamdani ganteng" width={200} height={200} />
            <p>{user?.name}</p>
            <p>{user?.email}</p>
            <Link href="/api/auth/signout">logout</Link>
        </div>
    )
}

export default page
