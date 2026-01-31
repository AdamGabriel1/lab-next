'use client'
import { updateTaskStatus, deleteTask } from '@/projects/kanban/actions'
import { Trash2, GripVertical, ChevronRight } from 'lucide-react'

export default function TaskCard({ task }: { task: any }) {
    const priorityClasses: any = {
        high: 'bg-red-500 text-white border-transparent',
        medium: 'bg-amber-400 text-slate-900 border-transparent',
        low: 'bg-emerald-500 text-white border-transparent',
    };

    const color = priorityClasses[task.priority as keyof typeof priorityClasses] || priorityClasses.low;

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200/60 dark:border-slate-700/50 flex flex-col gap-5 transition-all hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden">
            {/* Indicador Lateral de Status */}
            <div className={`absolute left-0 top-0 h-full w-1.5 ${task.status === 'done' ? 'bg-emerald-500' : task.status === 'doing' ? 'bg-amber-500' : 'bg-slate-300'}`} />

            <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col gap-3 flex-1">
                    <div className="flex items-center gap-2">
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-lg uppercase tracking-tighter ${color}`}>
                            {task.priority || 'Normal'}
                        </span>
                        <span className="text-[8px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">
                            ID-{task.id.slice(0, 4)}
                        </span>
                    </div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug">
                        {task.title}
                    </p>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <GripVertical size={16} className="text-slate-200 dark:text-slate-700 cursor-grab" />
                    <button
                        onClick={() => confirm('Apagar permanentemente?') && deleteTask(task.id)}
                        className="p-2 text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>

            {/* Controle de Fluxo (Abas) */}
            <div className="flex p-1 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                {(['todo', 'doing', 'done'] as const).map((status) => (
                    <button
                        key={status}
                        disabled={task.status === status}
                        onClick={() => updateTaskStatus(task.id, status)}
                        className={`flex-1 text-[8px] font-black py-2 rounded-xl transition-all uppercase tracking-tighter flex items-center justify-center gap-1 ${task.status === status
                            ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                            : 'text-slate-400 dark:text-slate-600 hover:text-slate-900 dark:hover:text-slate-300'
                            }`}
                    >
                        {task.status === status && <ChevronRight size={10} className="animate-bounce-x" />}
                        {status === 'todo' ? 'Backlog' : status === 'doing' ? 'Active' : 'Finished'}
                    </button>
                ))}
            </div>
        </div>
    )
}