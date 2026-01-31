'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function addItem(formData: FormData) {
    const title = formData.get('title')
    const price = formData.get('price')

    await supabase.from('wishlist').insert([{ title, price }])

    revalidatePath('/wishlist') // Atualiza a página instantaneamente
}

export async function toggleItem(id: number, is_completed: boolean) {
    await supabase.from('wishlist').update({ is_completed: !is_completed }).eq('id', id)
    revalidatePath('/wishlist')
}