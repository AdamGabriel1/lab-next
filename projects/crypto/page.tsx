import CryptoTable from '@/components/crypto/CryptoTable';
import { TrendingUp, Activity, Globe } from 'lucide-react';

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
        <main className="max-w-6xl mx-auto p-4 md:p-12 min-h-screen transition-all">
            <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                        <Activity size={16} className="animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Live Market Feed</span>
                    </div>
                    <h1 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">
                        Crypto<span className="text-blue-600">.</span>Hub
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium italic">
                        Monitoramento global de ativos digitais em tempo real.
                    </p>
                </div>

                <div className="flex gap-4">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                            <span className="text-xs font-bold text-slate-900 dark:text-white">Conectado</span>
                        </div>
                    </div>
                    <div className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-500/20 flex items-center justify-center text-white">
                        <Globe size={24} />
                    </div>
                </div>
            </header>

            <CryptoTable initialData={coins} />

            <footer className="mt-12 text-center border-t border-slate-100 dark:border-slate-800 pt-8">
                <p className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em]">
                    Data provided by CoinGecko API • Updated every 60s
                </p>
            </footer>
        </main>
    );
}