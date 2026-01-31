'use server'

import { createClient } from '@supabase/supabase-js'
import { auth } from '@/app/auth'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function sendMessage(formData: FormData) {
    const session = await auth()
    if (!session) return { error: "Logue para conversar" }

    const text = formData.get('message') as string
    if (!text.trim()) return

    await supabase.from('messages').insert([
        {
            text,
            user_email: session.user?.email,
            user_name: session.user?.name || 'Anônimo'
        }
    ])
}