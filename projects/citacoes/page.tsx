import RefreshButton from '@/components/citacoes/RefreshButton'
import CopyButton from '@/components/citacoes/CopyButton'
import { Quote as QuoteIcon, Sparkles } from 'lucide-react'

async function getQuote() {
  const localQuotes = [
    { content: "A persistência é o caminho do êxito.", author: "Charles Chaplin" },
    { content: "O sucesso é ir de fracasso em fracasso sem perder o entusiasmo.", author: "Winston Churchill" },
    { content: "Codar é a arte de transformar café em lógica.", author: "Programador Anônimo" },
    { content: "Se o plano A não funcionou, o alfabeto tem mais 25 letras.", author: "Desconhecido" }
  ];

  try {
    const res = await fetch('https://api.adviceslip.com/advice', {
      cache: 'no-store',
      signal: AbortSignal.timeout(3000)
    });
    if (!res.ok) throw new Error();
    const data = await res.json();
    return { content: data.slip.advice, author: "Advice Slip" };
  } catch (error) {
    const randomIndex = Math.floor(Math.random() * localQuotes.length);
    return localQuotes[randomIndex];
  }
}

export default async function Page() {
  const quote = await getQuote();

  return (
    <main className="flex min-h-[90vh] flex-col items-center justify-center p-4 md:p-12 relative overflow-hidden bg-slate-50/30 dark:bg-[#080b14]">

      {/* Background Decorativo - Glow sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-600/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-3xl w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl p-8 md:p-20 rounded-[3.5rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] border border-white dark:border-slate-800 relative group transition-all duration-700">

        {/* Ícone de Aspas Flutuante */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-slate-900 dark:bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 text-white">
          <QuoteIcon size={24} fill="currentColor" />
        </div>

        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-4">
            <Sparkles size={12} className="text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Inspiração Diária</span>
          </div>
        </header>

        <div className="relative">
          {/* Aspas Gigantes de Fundo */}
          <span className="absolute -top-10 -left-4 text-[12rem] text-slate-200/40 dark:text-slate-700/20 font-serif select-none pointer-events-none">“</span>

          <blockquote className="relative z-10">
            <p className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.15] tracking-tighter italic text-center">
              {quote.content}
            </p>
          </blockquote>
        </div>

        <div className="mt-10 flex flex-col items-center">
          <div className="h-px w-12 bg-blue-600/30 mb-6" />
          <p className="text-center text-blue-600 dark:text-blue-400 font-black uppercase text-xs tracking-[0.3em] italic">
            — {quote.author}
          </p>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8">
          <RefreshButton />
          <div className="h-px w-8 bg-slate-200 dark:bg-slate-800 hidden sm:block" />
          <CopyButton text={quote.content} />
        </div>
      </div>

      <footer className="mt-12 opacity-40 hover:opacity-100 transition-opacity">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">
          Wisdom Engine v1.0
        </p>
      </footer>
    </main>
  );
}