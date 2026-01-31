'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function Editor({ onChange }: { onChange: (html: string) => void }) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Comece a escrever seu artigo...</p>',
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
        editorProps: {
            attributes: {
                // Adicionada a classe prose-invert aqui também para visualização em tempo real
                class: 'prose prose-sm sm:prose lg:prose-lg dark:prose-invert m-5 focus:outline-none min-h-[400px] text-slate-900 dark:text-slate-100',
            },
        },
        immediatelyRender: false,
    })

    if (!editor) return null

    const btnClass = (active: boolean) =>
        `p-2.5 rounded-xl font-bold transition-all ${active
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`

    return (
        <div className="border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden bg-white dark:bg-slate-900 shadow-xl transition-colors">
            {/* Toolbar Dark Mode Ready */}
            <div className="bg-slate-50 dark:bg-slate-950 p-3 border-b border-slate-200 dark:border-slate-800 flex gap-2 flex-wrap items-center">
                <button onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))}>B</button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive('italic'))}>I</button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive('heading'))}>H2</button>
                <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive('bulletList'))}>Lista</button>
                <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-800 mx-1" />
                <button onClick={() => editor.chain().focus().undo().run()} className={btnClass(false)}>↺</button>
            </div>

            <EditorContent editor={editor} />
        </div>
    )
}