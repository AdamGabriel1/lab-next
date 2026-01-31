// components/kanban/Column.tsx
'use client'
import TaskCard from './TaskCard'
import { addTask } from '@/projects/kanban/actions'
import { useRef, useState } from 'react'

export default function Column({ id, title, tasks }: any) {
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
        <div className="bg-slate-100 dark:bg-slate-900/50 rounded-3xl p-5 flex flex-col min-h-[600px] border border-slate-200 dark:border-slate-800 transition-colors">
            {/* Cabeçalho da Coluna */}
            <div className="flex justify-between items-center mb-6 px-2">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    {title}
                </h2>
                <span className="bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                    {tasks.length}
                </span>
            </div>

            {/* Lista de Cards */}
            <div className="flex flex-col gap-4 flex-1">
                {tasks.length === 0 && !isAdding && (
                    <div className="flex flex-col items-center justify-center py-10 opacity-60 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600">Vazio</p>
                    </div>
                )}

                {tasks.map((task: any) => (
                    <TaskCard key={task.id} task={task} />
                ))}

                {isAdding ? (
                    <form
                        ref={formRef}
                        action={handleAdd}
                        className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border-2 border-blue-500 animate-in fade-in zoom-in-95 duration-200"
                    >
                        <input
                            name="title"
                            autoFocus
                            placeholder="O que precisa ser feito?"
                            className="w-full text-sm outline-none mb-3 bg-transparent dark:text-white placeholder:text-slate-400"
                            onBlur={() => !formRef.current?.title.valueOf() && setIsAdding(false)}
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase hover:text-slate-600"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest"
                            >
                                Adicionar
                            </button>
                        </div>
                    </form>
                ) : (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-2xl text-slate-400 dark:text-slate-600 hover:text-blue-500 hover:border-blue-400 dark:hover:border-blue-800 transition-all text-[10px] font-black uppercase tracking-widest"
                    >
                        + Novo Item
                    </button>
                )}
            </div>
        </div>
    )
}