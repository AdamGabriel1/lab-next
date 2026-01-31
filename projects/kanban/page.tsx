// app/kanban/page.tsx
import { createClient } from '@supabase/supabase-js'
import Column from '@/components/kanban/Column'

export default async function KanbanPage() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: tasks } = await supabase.from('tasks').select('*').order('created_at', { ascending: true })

    return (
        <main className="min-h-screen p-6 md:p-12 transition-colors duration-300">
            <header className="max-w-7xl mx-auto mb-12 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Kanban Central</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-mono text-xs italic">Gerenciamento de fluxo via ações diretas</p>
                </div>
            </header>

            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                <Column
                    id="todo"
                    title="Para Fazer"
                    tasks={tasks?.filter(t => t.status === 'todo') || []}
                />
                <Column
                    id="doing"
                    title="Em Progresso"
                    tasks={tasks?.filter(t => t.status === 'doing') || []}
                />
                <Column
                    id="done"
                    title="Concluído"
                    tasks={tasks?.filter(t => t.status === 'done') || []}
                />
            </div>
        </main>
    )
}