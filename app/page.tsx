// app/page.tsx
import Link from 'next/link'

export default function Home() {
  const meusProjetos = [
    {
      titulo: "💬 Mural de Citações",
      descricao: "Consumo de API externa com fallback local e Server Actions para revalidação.",
      link: "/lab/citacoes",
      cor: "hover:border-blue-500 text-blue-500"
    },
    {
      titulo: "📚 Portfólio MDX",
      descricao: "Gerenciamento de conteúdo estático usando arquivos Markdown e tipografia otimizada.",
      link: "/lab/projetos",
      cor: "hover:border-green-500 text-green-500"
    },
    {
      titulo: "💰 Crypto Tracker",
      descricao: "Dashboard dinâmico com filtragem em tempo real e ISR.",
      link: "/lab/crypto",
      cor: "hover:border-orange-500 text-orange-500"
    },
    {
      titulo: "🎁 Wishlist DB",
      descricao: "Aplicação Fullstack com Supabase para gerenciar dados em tempo real.",
      link: "/lab/wishlist",
      cor: "hover:border-purple-500 text-purple-500"
    },
    {
      titulo: "📋 Kanban Flow",
      descricao: "Gerenciador de tarefas com Drag and Drop e UI otimista.",
      link: "/lab/kanban",
      cor: "hover:border-rose-500 text-rose-500"
    },
    {
      titulo: "📊 Finanças Pro",
      descricao: "Dashboard financeiro com autenticação social e gráficos dinâmicos.",
      link: "/lab/financas",
      cor: "hover:border-emerald-500 text-emerald-500"
    },
    {
      titulo: "🔗 Link Zip",
      descricao: "Encurtador de links com geração de QR Code e Analytics.",
      link: "/lab/encurtador",
      cor: "hover:border-cyan-500 text-cyan-500"
    },
    {
      titulo: "💬 Chat App",
      descricao: "Mensageria em tempo real com WebSockets e Presence.",
      link: "/lab/chat",
      cor: "hover:border-indigo-500 text-indigo-500"
    },
    {
      titulo: "📝 CMS Lab",
      descricao: "Sistema de gerenciamento de conteúdo com editor de texto rico.",
      link: "/lab/cms",
      cor: "hover:border-amber-500 text-amber-500"
    },
    {
      titulo: "🚀 Hub Control",
      descricao: "Centro de comando com estatísticas agregadas de todos os módulos.",
      link: "/lab/hub",
      cor: "hover:border-slate-900 dark:hover:border-white text-slate-900 dark:text-white"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">
            LAB.NEXT <span className="text-blue-600 font-mono">_</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Uma jornada de 10 projetos explorando o poder do Next.js e Supabase.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meusProjetos.map((projeto) => (
            <Link
              key={projeto.link}
              href={projeto.link}
              className={`group p-8 bg-white dark:bg-slate-900 rounded-3xl border-2 border-transparent shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${projeto.cor}`}
            >
              <h2 className="text-2xl font-black mb-3 text-slate-800 dark:text-slate-100 group-hover:text-inherit transition-colors">
                {projeto.titulo}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm font-medium">
                {projeto.descricao}
              </p>

              <div className="mt-8 flex items-center text-xs font-black uppercase tracking-[0.2em] opacity-30 group-hover:opacity-100 transition-opacity">
                Acessar Módulo <span className="ml-2">→</span>
              </div>
            </Link>
          ))}
        </div>

        <footer className="mt-24 text-center border-t border-slate-200 dark:border-slate-800 pt-8">
          <p className="text-slate-400 dark:text-slate-600 font-bold text-sm tracking-widest uppercase">
            Developed by Adam 🚀 2026
          </p>
        </footer>
      </div>
    </main>
  )
}