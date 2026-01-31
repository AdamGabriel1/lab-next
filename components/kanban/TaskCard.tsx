// components/kanban/TaskCard.tsx
'use client'
import { updateTaskStatus, deleteTask } from '@/projects/kanban/actions'

export default function TaskCard({ task }: { task: any }) {
    const priorityClasses: any = {
        high: 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-100 dark:border-red-500/20',
        medium: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-500/20',
        low: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20',
    };

    const color = priorityClasses[task.priority as keyof typeof priorityClasses] || priorityClasses.low;

    return (
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-4 transition-all hover:shadow-md group">
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border w-fit uppercase tracking-tighter ${color}`}>
                        {task.priority || 'baixa'}
                    </span>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug">{task.title}</p>
                </div>

                <button
                    onClick={() => confirm('Deseja excluir?') && deleteTask(task.id)}
                    className="text-slate-300 dark:text-slate-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="grid grid-cols-3 gap-1 pt-3 border-t border-slate-50 dark:border-slate-700/50">
                {(['todo', 'doing', 'done'] as const).map((status) => (
                    <button
                        key={status}
                        disabled={task.status === status}
                        onClick={() => updateTaskStatus(task.id, status)}
                        className={`text-[8px] font-black py-1.5 rounded-lg transition-all uppercase tracking-tighter ${task.status === status
                            ? 'bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600'
                            : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10'
                            }`}
                    >
                        {status === 'todo' ? 'A fazer' : status === 'doing' ? 'Em progresso' : 'Concluído'}
                    </button>
                ))}
            </div>
        </div>
    )
}