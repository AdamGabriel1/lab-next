'use client'
import TaskCard from './TaskCard'
import { addTask } from '@/projects/kanban/actions'
import { useRef, useState } from 'react'
import { Plus, X, MoreHorizontal } from 'lucide-react'

export default function Column({ id, title, tasks, icon }: any) {
    const formRef = useRef<HTMLFormElement>(null);
    const [isAdding, setIsAdding] = useState(false);

    async function handleAdd(formData: FormData) {
        const titleText = formData.get('title') as string;
        if (!titleText.trim()) {
            setIsAdding(false);
            return;
        }
        await addTask(titleText, id);
        formRef.current?.reset();
        setIsAdding(false);
    }

    return (
        <div className="bg-slate-200/40 dark:bg-slate-900/40 backdrop-blur-sm rounded-[2.5rem] p-6 flex flex-col min-h-[700px] border border-white dark:border-slate-800/50 shadow-inner transition-all">
            {/* Cabeçalho da Coluna */}
            <div className="flex justify-between items-center mb-8 px-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                        {icon}
                    </div>
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">
                        {title}
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    <span className="bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-lg shadow-blue-500/20">
                        {tasks.length}
                    </span>
                </div>
            </div>

            {/* Lista de Cards */}
            <div className="flex flex-col gap-5 flex-1 overflow-y-auto scrollbar-hide pb-10">
                {tasks.map((task: any) => (
                    <TaskCard key={task.id} task={task} />
                ))}

                {isAdding ? (
                    <form
                        ref={formRef}
                        action={handleAdd}
                        className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-2xl border-2 border-blue-500 animate-in slide-in-from-top-2 duration-300"
                    >
                        <textarea
                            name="title"
                            autoFocus
                            rows={3}
                            placeholder="Descreva a nova tarefa..."
                            className="w-full text-sm font-medium outline-none mb-4 bg-transparent dark:text-white placeholder:text-slate-400 resize-none"
                        />
                        <div className="flex justify-end gap-4 items-center">
                            <button
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500"
                            >
                                <X size={16} />
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95"
                            >
                                Confirmar
                            </button>
                        </div>
                    </form>
                ) : (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center justify-center gap-3 p-5 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-[2rem] text-slate-400 dark:text-slate-600 hover:text-blue-500 hover:border-blue-500/50 hover:bg-white dark:hover:bg-slate-800 transition-all text-[11px] font-black uppercase tracking-[0.2em]"
                    >
                        <Plus size={16} /> Novo Item
                    </button>
                )}
            </div>
        </div>
    )
}