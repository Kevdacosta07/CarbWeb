'use client';

import { useState } from 'react';
import { CarbonAnalyzer } from '@/app/component/CarbonAnalyzer';
import { CarbonResults } from '@/app/component/CarbonResults';
import { EcoTips } from '@/app/component/EcoTips';
import type { CarbonAnalysisResult } from '@/utils/types';

export default function Home() {
  const [analysisData, setAnalysisData] = useState<CarbonAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysis = (data: CarbonAnalysisResult) => {
    setAnalysisData(data);
    setTimeout(() => {
      const resultsElement = document.getElementById('results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const resetAnalysis = () => {
    setAnalysisData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] dark:bg-[#0C0C0C] text-stone-900 dark:text-stone-100 transition-colors duration-500 font-sans selection:bg-emerald-500/20">
      
      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
            {/* Hero */}
            <div className={`transition-all duration-700 ease-out ${analysisData ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
                <div className="flex flex-col items-center text-center mb-20">
                    <div className="mb-8 px-4 py-1.5 rounded-full border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm text-xs font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
                        Intelligence Web Durable
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-balance">
                        Le web a un <br/>
                        <span className="text-emerald-600 dark:text-emerald-500">poids.</span>
                    </h1>
                    <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
                        Chaque octet compte. Mesurez l'empreinte carbone de votre site web et optimisez pour un internet plus vert et plus rapide.
                    </p>
                </div>

                {/* Analyzer */}
                <div className="mb-32">
                    <CarbonAnalyzer 
                        onAnalysis={handleAnalysis} 
                        isLoading={isLoading} 
                        setIsLoading={setIsLoading} 
                    />
                </div>

                {/* Minimal Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-200 dark:bg-stone-800 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden">
                    <div className="bg-[#FDFCF8] dark:bg-[#0C0C0C] p-10 flex flex-col items-center text-center hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors">
                        <span className="text-3xl mb-4">⚡️</span>
                        <h3 className="font-bold mb-2">Vitesse</h3>
                        <p className="text-sm text-stone-500">Temps de chargement réduits, meilleure UX.</p>
                    </div>
                    <div className="bg-[#FDFCF8] dark:bg-[#0C0C0C] p-10 flex flex-col items-center text-center hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors">
                        <span className="text-3xl mb-4">🌱</span>
                        <h3 className="font-bold mb-2">Écologie</h3>
                        <p className="text-sm text-stone-500">Moins d'émissions de CO2 par visite.</p>
                    </div>
                    <div className="bg-[#FDFCF8] dark:bg-[#0C0C0C] p-10 flex flex-col items-center text-center hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors">
                        <span className="text-3xl mb-4">📈</span>
                        <h3 className="font-bold mb-2">SEO</h3>
                        <p className="text-sm text-stone-500">Meilleur classement sur les moteurs de recherche.</p>
                    </div>
                </div>
            </div>

            {/* Results */}
            {analysisData && (
                <div id="results-section" className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold">Rapport d'Analyse</h2>
                        <button onClick={resetAnalysis} className="text-sm font-medium underline decoration-stone-300 underline-offset-4 hover:text-emerald-500 transition-colors">
                            Analyser un autre site
                        </button>
                    </div>
                    <CarbonResults data={analysisData} />
                    <div className="mt-24">
                        <EcoTips />
                    </div>
                </div>
            )}
        </div>
      </main>
    </div>
  );
}
