'use client'
import { useState } from 'react';
import { Search, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export default function CryptoTable({ initialData }: { initialData: any[] }) {
    const [search, setSearch] = useState('');

    const filteredCoins = initialData.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* Barra de Busca Estilizada */}
            <div className="relative group max-w-md">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    <Search size={18} />
                </div>
                <input
                    type="text"
                    placeholder="Filtrar por nome ou símbolo..."
                    className="w-full p-5 pl-14 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:border-blue-500/50 transition-all shadow-sm font-medium"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Container da Tabela */}
            <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900 transition-all">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400"># Rank</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Ativo</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Preço Atual</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Variação 24h</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filteredCoins.map((coin) => {
                                const isPositive = coin.price_change_percentage_24h > 0;
                                return (
                                    <tr key={coin.id} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group">
                                        <td className="p-6">
                                            <span className="font-mono text-xs font-black text-slate-400">
                                                {String(coin.market_cap_rank).padStart(2, '0')}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    <img src={coin.image} alt={coin.name} className="w-8 h-8 relative z-10" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1 group-hover:text-blue-600 transition-colors">
                                                        {coin.name}
                                                    </span>
                                                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded w-fit">
                                                        {coin.symbol}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col">
                                                <span className="font-mono font-black text-lg text-slate-800 dark:text-slate-100 tracking-tighter">
                                                    ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                                                </span>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase italic">USD Currency</span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-black text-xs transition-all ${isPositive
                                                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                                    : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                                                }`}>
                                                {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                                {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {filteredCoins.length === 0 && (
                    <div className="p-32 text-center flex flex-col items-center justify-center gap-4">
                        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full text-slate-300 dark:text-slate-600">
                            <Minus size={32} />
                        </div>
                        <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">
                            Nenhum ativo encontrado para "{search}"
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}