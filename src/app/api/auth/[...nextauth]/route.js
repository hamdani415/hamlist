import NextAuth from "next-auth"
import googleAuth from "next-auth/providers/google"

export const autoOption = {
    providers: [
        googleAuth({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,

        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email
            }
            return token
        },
        async session({ session, token }) {
            session.user.email = token.email
            session.accessToken = token   // 👈 tambahin di sini
            return session
        }
    }

}

const handler = NextAuth(autoOption)

export { handler as GET, handler as POST }