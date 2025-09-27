import { autoOption } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export const authUserSesion = async () => {
    const sesion = await getServerSession(autoOption)
    // const token = sesion?.accessToken
    // console.log("Token:", token)
    return sesion?.user
}

export const authtokenSesion = async () => {
    const sesion = await getServerSession(autoOption)
    return sesion
}
