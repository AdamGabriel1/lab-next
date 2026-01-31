// app/citacoes/page.tsx
import RefreshButton from '@/components/citacoes/RefreshButton'
import CopyButton from '@/components/citacoes/CopyButton'

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
    <main className="flex min-h-[80vh] flex-col items-center justify-center p-6 transition-colors">
      <div className="max-w-2xl w-full bg-white dark:bg-slate-900 p-10 md:p-16 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">

        {/* Detalhe decorativo de aspas de fundo */}
        <span className="absolute top-4 left-6 text-8xl text-slate-100 dark:text-slate-800/50 font-serif select-none">“</span>

        <h1 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-slate-400 dark:text-slate-500 text-center">
          Citação do Dia
        </h1>

        <blockquote className="relative z-10 italic text-2xl md:text-3xl font-medium text-slate-800 dark:text-slate-100 leading-relaxed text-center">
          "{quote.content}"
        </blockquote>

        <p className="mt-6 text-center text-blue-600 dark:text-blue-400 font-black uppercase text-[10px] tracking-widest">
          — {quote.author}
        </p>

        <div className="mt-12 flex flex-col items-center gap-4">
          <RefreshButton />
          <CopyButton text={quote.content} />
        </div>
      </div>
    </main>
  );
}