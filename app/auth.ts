// auth.ts
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { createClient } from '@supabase/supabase-js'
import bcrypt from "bcryptjs"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Senha", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                const { data: user } = await supabase
                    .from('users')
                    .select('*')
                    .eq('email', credentials.email)
                    .single()

                // Se não achar o usuário ou houver erro no Supabase
                if (!user) return null

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                )

                if (!isPasswordCorrect) return null

                return { id: user.id, name: user.name, email: user.email }
            }
        })
    ],
    // ADICIONE ESTE BLOCO ABAIXO:
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/login',
    },
    secret: process.env.AUTH_SECRET,
})