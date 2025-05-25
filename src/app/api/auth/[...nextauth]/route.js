import NextAuth from "next-auth"
import googleAuth from "next-auth/providers/google"

export const autoOption = {
    providers : [
        googleAuth({
            clientId : process.env.GOOGLE_ID,
            clientSecret : process.env.GOOGLE_SECRET,

        })
    ],
    secret : process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(autoOption)

export {handler as GET , handler as POST}