import { autoOption } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export const authUserSesion = async () => {
    const sesion = await getServerSession(autoOption)
    return sesion?.user
}
