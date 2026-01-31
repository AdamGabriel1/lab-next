'use server'

import { createClient } from '@supabase/supabase-js'
import { auth } from '@/app/auth'
import { revalidatePath } from 'next/cache'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function createPost(title: string, content: string) {
    const session = await auth()
    if (!session?.user?.email) return { error: "Não autorizado" }

    const { error } = await supabase.from('posts').insert([
        {
            title,
            content,
            user_email: session.user.email,
            status: 'published'
        }
    ])

    if (error) return { error: error.message }

    revalidatePath('/cms')
    return { success: true }
}