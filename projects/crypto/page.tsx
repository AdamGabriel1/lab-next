// app/crypto/page.tsx
import CryptoTable from '@/components/crypto/CryptoTable';

async function getCryptoData() {
    const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false',
        { next: { revalidate: 60 } }
    );

    if (!res.ok) throw new Error('Erro ao buscar dados da CoinGecko');
    return res.json();
}

export default async function CryptoPage() {
    const coins = await getCryptoData();

    return (
        <main className="max-w-6xl mx-auto p-6 md:p-12 transition-colors">
            <header className="mb-10">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">Crypto Market</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                    Preços atualizados em tempo real <span className="text-blue-600 dark:text-blue-400 font-bold">(USD)</span>
                </p>
            </header>

            <CryptoTable initialData={coins} />
        </main>
    );
}