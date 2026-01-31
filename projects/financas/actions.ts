// projects/financas/actions.ts
'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

/**
 * Adiciona uma nova transação ao banco de dados
 */
export async function addTransaction(formData: FormData) {
    const description = formData.get('description') as string
    const amount = Number(formData.get('amount'))
    const type = formData.get('type') as string
    const user_email = formData.get('user_email') as string

    const { error } = await supabase
        .from('transactions')
        .insert([{ description, amount, type, user_email }])

    if (error) {
        console.error("Erro ao inserir:", error)
        return { error: "Falha ao salvar transação" }
    }

    // Atualiza os dados da página sem precisar de refresh manual
    revalidatePath('/lab/financas')
}

/**
 * Remove uma transação existente
 */
export async function deleteTransaction(id: string) {
    const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)

    if (error) {
        console.error("Erro ao deletar:", error)
        throw new Error("Não foi possível excluir a transação.")
    }

    revalidatePath('/lab/financas')
}