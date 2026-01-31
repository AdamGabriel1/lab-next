// components/crypto/CryptoTable.tsx
'use client'
import { useState } from 'react';

export default function CryptoTable({ initialData }: { initialData: any[] }) {
    const [search, setSearch] = useState('');

    const filteredCoins = initialData.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="relative group">
                <input
                    type="text"
                    placeholder="Pesquisar moeda (ex: Bitcoin)..."
                    className="w-full p-4 pl-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-500/30 transition-all shadow-sm"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            <div className="overflow-x-auto rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900 transition-colors">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                            <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Moeda</th>
                            <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Preço</th>
                            <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 text-right">24h (%)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {filteredCoins.map((coin) => (
                            <tr key={coin.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                <td className="p-5 flex items-center gap-4">
                                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl group-hover:scale-110 transition-transform">
                                        <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-slate-900 dark:text-slate-100">{coin.name}</span>
                                        <span className="text-slate-400 uppercase text-[10px] font-black tracking-tighter">{coin.symbol}</span>
                                    </div>
                                </td>
                                <td className="p-5">
                                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                                        ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </span>
                                </td>
                                <td className={`p-5 text-right font-black text-sm`}>
                                    <span className={`px-3 py-1 rounded-full ${coin.price_change_percentage_24h > 0
                                            ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                            : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                                        }`}>
                                        {coin.price_change_percentage_24h > 0 ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredCoins.length === 0 && (
                    <div className="p-20 text-center text-slate-400 font-medium">
                        Nenhuma moeda encontrada para "{search}"
                    </div>
                )}
            </div>
        </div>
    );
}