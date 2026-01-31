// app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'

export async function refreshQuote() {
    // Isto diz ao Next.js para limpar a cache da página principal
    // e ir buscar dados novos à API.
    revalidatePath('/')
}