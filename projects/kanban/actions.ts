'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function addTask(title: string, status: string = 'todo') {
    await supabase.from('tasks').insert([{ title, status }])
    revalidatePath('/kanban')
}

export async function updateTaskStatus(id: string, newStatus: string) {
    await supabase.from('tasks').update({ status: newStatus }).eq('id', id)
    revalidatePath('/kanban')
}

export async function deleteTask(id: string) {
    await supabase.from('tasks').delete().eq('id', id)
    revalidatePath('/kanban')
}