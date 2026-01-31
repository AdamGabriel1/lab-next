'use server'

import { createClient } from '@supabase/supabase-js'
import { auth } from '@/app/auth'
import { revalidatePath } from 'next/cache'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function addTransaction(formData: FormData) {
    const session = await auth()
    if (!session?.user?.email) throw new Error("Não autorizado")

    const description = formData.get('description') as string
    const amount = parseFloat(formData.get('amount') as string)
    const type = formData.get('type') as 'income' | 'expense'

    const { error } = await supabase.from('transactions').insert([
        {
            description,
            amount,
            type,
            user_email: session.user.email
        }
    ])

    if (error) console.error(error)
    revalidatePath('/financas')
}