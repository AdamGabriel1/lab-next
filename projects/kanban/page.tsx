import { createClient } from '@supabase/supabase-js'
import Column from '@/components/kanban/Column'
import { Layout, CheckCircle2, Circle, PlayCircle, Settings2 } from 'lucide-react'

export default async function KanbanPage() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: tasks } = await supabase.from('tasks').select('*').order('created_at', { ascending: true })

    return (
        <main className="min-h-screen p-4 md:p-10 bg-slate-50/50 dark:bg-[#080c14] transition-colors duration-500">
            <header className="max-w-[1600px] mx-auto mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Layout size={18} className="text-blue-600 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Workflow Engine v2</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
                        Kanban<span className="text-blue-600 font-serif">.</span>Central
                    </h1>
                </div>

                <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                    <div className="px-4 border-r border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Total Tasks</p>
                        <p className="text-xl font-black">{tasks?.length || 0}</p>
                    </div>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                        <Settings2 size={20} className="text-slate-400" />
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1600px] mx-auto items-start">
                <Column
                    id="todo"
                    title="Planejamento"
                    icon={<Circle size={14} className="text-slate-400" />}
                    tasks={tasks?.filter(t => t.status === 'todo') || []}
                />
                <Column
                    id="doing"
                    title="Execução"
                    icon={<PlayCircle size={14} className="text-amber-500" />}
                    tasks={tasks?.filter(t => t.status === 'doing') || []}
                />
                <Column
                    id="done"
                    title="Finalizado"
                    icon={<CheckCircle2 size={14} className="text-emerald-500" />}
                    tasks={tasks?.filter(t => t.status === 'done') || []}
                />
            </div>
        </main>
    )
}