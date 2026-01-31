'use server'

import { createClient } from '@supabase/supabase-js'
import bcrypt from "bcryptjs"
import { redirect } from 'next/navigation'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function registerUser(formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // 1. Criptografar a senha (Salt de 10 rounds é o padrão seguro)
    const hashedPassword = await bcrypt.hash(password, 10)

    // 2. Salvar no Supabase
    const { error } = await supabase.from('users').insert([
        { name, email, password: hashedPassword }
    ])

    if (error) {
        return { error: "Erro ao criar conta. Talvez o e-mail já exista." }
    }

    // 3. Redirecionar para o login após sucesso
    redirect('/login')
}