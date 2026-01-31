'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
    Bold, Italic, Heading2, List, RotateCcw,
    Code2
} from 'lucide-react'

interface EditorProps {
    onContentChange: (html: string) => void
}

export default function Editor({ onContentChange }: EditorProps) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Comece a escrever seu artigo...</p>',
        onUpdate: ({ editor }) => onContentChange(editor.getHTML()),
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg dark:prose-invert focus:outline-none min-h-[450px] p-8 md:p-12 text-slate-800 dark:text-slate-200 max-w-none',
            },
        },
        immediatelyRender: false,
    })

    if (!editor) return null

    const btnClass = (active: boolean) =>
        `p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center ${active
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-500/20'
            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`

    return (
        <div className="group border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate-900 shadow-2xl transition-all focus-within:border-blue-500/50">
            {/* Toolbar Profissional */}
            <div className="bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md p-3 border-b border-slate-200 dark:border-slate-800 flex gap-1.5 flex-wrap items-center sticky top-0 z-20">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={btnClass(editor.isActive('bold'))}
                    title="Negrito"
                >
                    <Bold size={18} strokeWidth={3} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={btnClass(editor.isActive('italic'))}
                    title="Itálico"
                >
                    <Italic size={18} strokeWidth={3} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={btnClass(editor.isActive('heading', { level: 2 }))}
                    title="Título"
                >
                    <Heading2 size={18} strokeWidth={3} />
                </button>

                <div className="w-[2px] h-6 bg-slate-200 dark:bg-slate-800 mx-2 rounded-full" />

                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={btnClass(editor.isActive('bulletList'))}
                    title="Lista"
                >
                    <List size={18} strokeWidth={3} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={btnClass(editor.isActive('codeBlock'))}
                    title="Bloco de Código"
                >
                    <Code2 size={18} strokeWidth={2} />
                </button>

                <div className="flex-1" /> {/* Spacer */}

                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    className={btnClass(false)}
                    title="Desfazer"
                >
                    <RotateCcw size={18} strokeWidth={2.5} />
                </button>
            </div>

            {/* Área de Escrita */}
            <div className="relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-600/0 group-focus-within:bg-blue-600/100 transition-all duration-500" />
                <EditorContent editor={editor} />
            </div>

            {/* Rodapé do Editor */}
            <div className="px-8 py-3 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    Editor de Markdown Ativado
                </span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    {editor.storage.characterCount?.characters?.() || 0} Caracteres
                </span>
            </div>
        </div>
    )
}