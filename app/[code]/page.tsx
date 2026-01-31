// app/[code]/page.tsx
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

// Definimos o tipo dos params como uma Promise
interface PageProps {
    params: Promise<{ code: string }>
}

export default async function RedirectPage({ params }: PageProps) {
    // 1. "Unwrap" (desembrulhar) o params antes de usar
    const { code } = await params

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // 2. Busca a URL original usando o code já extraído
    const { data } = await supabase
        .from('links')
        .select('original_url, clicks')
        .eq('short_code', code)
        .single()

    if (data) {
        // 3. Incrementa o contador de cliques
        await supabase
            .from('links')
            .update({ clicks: data.clicks + 1 })
            .eq('short_code', code)

        // 4. Redireciona para o destino
        redirect(data.original_url)
    }

    // Se o código não existir, manda para a página de 404
    redirect('/')
}