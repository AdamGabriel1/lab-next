'use server'

import { createClient } from '@supabase/supabase-js'
import { auth } from '@/app/auth'
import { revalidatePath } from 'next/cache'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function createShortLink(originalUrl: string, shortCode: string) {
    const session = await auth()

    // 1. Limpar o código (remover espaços e caracteres especiais)
    const cleanCode = shortCode.toLowerCase().trim().replace(/[^a-z0-9-]/g, '')

    // 2. Verificar se o código já existe
    const { data: existing } = await supabase
        .from('links')
        .select('short_code')
        .eq('short_code', cleanCode)
        .single()

    if (existing) {
        return { error: "Este código já está em uso. Tente outro!" }
    }

    // 3. Inserir no banco
    const { error } = await supabase.from('links').insert([
        {
            original_url: originalUrl,
            short_code: cleanCode,
            user_email: session?.user?.email || null // Funciona mesmo deslogado
        }
    ])

    if (error) return { error: "Erro ao salvar o link." }

    revalidatePath('/encurtador')
    return { success: true, code: cleanCode }
}

export async function deleteLink(id: string) {
    const session = await auth()
    if (!session?.user?.email) return { error: "Não autorizado" }

    const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', id)
        .eq('user_email', session.user.email) // Segurança: Garante que o link pertence ao usuário

    if (error) return { error: "Erro ao deletar o link" }

    revalidatePath('/encurtador/admin')
    return { success: true }
}