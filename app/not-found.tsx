import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
            <h1 className="text-9xl font-black text-slate-200">404</h1>
            <p className="text-xl font-bold text-slate-800 -mt-10 mb-6">Ops! Esse link sumiu no tempo.</p>
            <Link href="/" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all">
                Voltar para o Início
            </Link>
        </div>
    )
}