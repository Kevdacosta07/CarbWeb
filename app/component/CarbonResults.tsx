'use client';

import { useState } from 'react';
import { TechnicalLink } from './TechnicalLink';

interface CarbonResultsProps {
    data: {
        url: string;
        strategy?: 'mobile' | 'desktop';
        score: number;
        totalSize: number;
        requests: number;
        co2PerVisit: number;
        annualCO2?: number;
        grade: string;
        details: {
            html: number;
            css: number;
            js: number;
            images: number;
            fonts: number;
            other: number;
        };
        suggestions: string[];
        isGreenHosted?: boolean;
        performanceMetrics?: {
            fcp: number;
            lcp: number;
            cls: number;
            tbt: number;
            speedIndex?: number;
            interactiveTime?: number;
        };
    };
}

export function CarbonResults({ data }: CarbonResultsProps) {
    const [monthlyVisitors, setMonthlyVisitors] = useState(10000);

    // Calculate annual impact based on visitors
    const annualCO2Kg = (data.co2PerVisit * monthlyVisitors * 12) / 1000;

    // Equivalences
    const equivalences = {
        trees: (annualCO2Kg / 22).toFixed(1), // 1 tree absorbs ~22kg CO2/year
        km: (annualCO2Kg / 0.18).toFixed(0), // ~180g CO2/km for a car
        smartphones: (annualCO2Kg / 85).toFixed(1) // ~85kg CO2 to produce a smartphone
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Ko';
        const k = 1024;
        const sizes = ['Octets', 'Ko', 'Mo', 'Go'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getGradeColor = (grade: string) => {
        const colors: Record<string, string> = {
            'A+': 'text-emerald-500',
            'A': 'text-emerald-500',
            'B': 'text-teal-500',
            'C': 'text-yellow-500',
            'D': 'text-orange-500',
            'E': 'text-red-500',
            'F': 'text-red-600'
        };
        return colors[grade] || 'text-stone-500';
    };

    const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
        <div className={`bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 ${className}`}>
            {children}
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* 1. Main Score (Large Square) */}
                <Card className="col-span-1 md:col-span-2 row-span-2 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-50 to-transparent dark:from-stone-800/50 dark:to-transparent opacity-50" />
                    <div className={`relative z-10 text-9xl font-bold tracking-tighter ${getGradeColor(data.grade)}`}>
                        {data.grade}
                    </div>
                    <div className="relative z-10 mt-2 flex flex-col items-center">
                        <span className="text-stone-400 dark:text-stone-500 font-medium uppercase tracking-widest text-sm">Eco Score</span>
                        <span className="text-2xl font-bold text-stone-900 dark:text-white mt-1">{data.score}/100</span>
                    </div>
                </Card>

                {/* 2. CO2 Emission (Wide) */}
                <Card className="col-span-1 md:col-span-2 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-stone-500 font-medium text-sm uppercase tracking-wider">Empreinte Carbone</h3>
                            <div className="mt-2 flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-stone-900 dark:text-white">{data.co2PerVisit.toFixed(2)}g</span>
                                <span className="text-stone-500">CO₂ / visite</span>
                            </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${data.co2PerVisit < 0.5 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-400'}`}>
                            {data.co2PerVisit < 0.5 ? 'Excellent' : data.co2PerVisit < 1 ? 'Bon' : 'À améliorer'}
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-stone-600 dark:text-stone-400">
                        {data.co2PerVisit < 0.5 
                            ? "Cette page est plus propre que 80% du web." 
                            : "Optimiser les images et scripts pourrait réduire cette valeur."}
                    </p>
                </Card>

                {/* 3. Hosting (Small) */}
                <Card className="col-span-1 flex flex-col justify-center items-center text-center">
                    <div className="text-3xl mb-2">{data.isGreenHosted ? '🌱' : '🏢'}</div>
                    <div className="font-bold text-stone-900 dark:text-white">
                        {data.isGreenHosted ? 'Hébergement Vert' : 'Hébergement Standard'}
                    </div>
                    <div className="text-xs text-stone-500 mt-1">
                        {data.isGreenHosted ? 'Alimenté par énergie renouvelable' : 'Énergie fossile probable'}
                    </div>
                </Card>

                {/* 4. Page Weight (Small) */}
                <Card className="col-span-1 flex flex-col justify-center items-center text-center">
                    <div className="text-3xl mb-2">⚖️</div>
                    <div className="font-bold text-stone-900 dark:text-white">{formatSize(data.totalSize)}</div>
                    <div className="text-xs text-stone-500 mt-1">Poids Total</div>
                </Card>

                {/* 5. Impact Simulator (Wide) */}
                <Card className="col-span-1 md:col-span-2 lg:col-span-4">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1 w-full">
                            <h3 className="text-stone-900 dark:text-white font-bold mb-1">Simulateur d'Impact Annuel</h3>
                            <p className="text-sm text-stone-500 mb-6">Ajustez le nombre de visiteurs mensuels pour voir le coût environnemental annuel.</p>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-stone-500">Visiteurs Mensuels</span>
                                    <span className="font-mono font-bold text-stone-900 dark:text-white">{monthlyVisitors.toLocaleString()}</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="100" 
                                    max="100000" 
                                    step="100" 
                                    value={monthlyVisitors} 
                                    onChange={(e) => setMonthlyVisitors(parseInt(e.target.value))}
                                    className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                            <div className="flex-shrink-0 p-4 bg-stone-50 dark:bg-stone-800/50 rounded-2xl min-w-[140px]">
                                <div className="text-2xl mb-2">🌳</div>
                                <div className="font-bold text-stone-900 dark:text-white">{equivalences.trees}</div>
                                <div className="text-xs text-stone-500">Arbres nécessaires</div>
                            </div>
                            <div className="flex-shrink-0 p-4 bg-stone-50 dark:bg-stone-800/50 rounded-2xl min-w-[140px]">
                                <div className="text-2xl mb-2">🚗</div>
                                <div className="font-bold text-stone-900 dark:text-white">{equivalences.km}</div>
                                <div className="text-xs text-stone-500">Km en voiture</div>
                            </div>
                            <div className="flex-shrink-0 p-4 bg-stone-50 dark:bg-stone-800/50 rounded-2xl min-w-[140px]">
                                <div className="text-2xl mb-2">📱</div>
                                <div className="font-bold text-stone-900 dark:text-white">{equivalences.smartphones}</div>
                                <div className="text-xs text-stone-500">Smartphones produits</div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 6. Resource Breakdown (Tall) */}
                <Card className="col-span-1 md:col-span-2 row-span-2">
                    <h3 className="font-bold text-stone-900 dark:text-white mb-6">Répartition des Ressources</h3>
                    <div className="space-y-4">
                        {Object.entries(data.details).map(([key, value]) => (
                            <div key={key} className="group">
                                <div className="flex justify-between text-sm mb-1.5">
                                    <span className="capitalize text-stone-600 dark:text-stone-400 flex items-center gap-2">
                                        {key === 'images' && '🖼️'}
                                        {key === 'js' && '📜'}
                                        {key === 'css' && '🎨'}
                                        {key === 'fonts' && '🔤'}
                                        {key === 'html' && '📄'}
                                        {key === 'other' && '📦'}
                                        {key}
                                    </span>
                                    <span className="font-mono text-stone-900 dark:text-white">{formatSize(value)}</span>
                                </div>
                                <div className="h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-stone-800 dark:bg-stone-200 transition-all duration-1000 ease-out" 
                                        style={{ width: `${Math.max((value / data.totalSize) * 100, 2)}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* 7. Performance Metrics (Grid) */}
                <Card className="col-span-1 md:col-span-2 row-span-2">
                    <h3 className="font-bold text-stone-900 dark:text-white mb-6">Signaux Web Essentiels</h3>
                    {data.performanceMetrics ? (
                        <div className="grid grid-cols-2 gap-4 h-full content-start">
                            <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-100 dark:border-stone-800">
                                <div className="text-xs text-stone-500 mb-1 uppercase tracking-wider">LCP</div>
                                <div className={`text-2xl font-bold ${data.performanceMetrics.lcp > 2500 ? 'text-orange-500' : 'text-emerald-500'}`}>
                                    {(data.performanceMetrics.lcp / 1000).toFixed(1)}s
                                </div>
                                <div className="text-[10px] text-stone-400 mt-1">Temps de chargement</div>
                            </div>
                            <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-100 dark:border-stone-800">
                                <div className="text-xs text-stone-500 mb-1 uppercase tracking-wider">CLS</div>
                                <div className={`text-2xl font-bold ${data.performanceMetrics.cls > 0.1 ? 'text-orange-500' : 'text-emerald-500'}`}>
                                    {data.performanceMetrics.cls.toFixed(3)}
                                </div>
                                <div className="text-[10px] text-stone-400 mt-1">Stabilité visuelle</div>
                            </div>
                            <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-100 dark:border-stone-800">
                                <div className="text-xs text-stone-500 mb-1 uppercase tracking-wider">FCP</div>
                                <div className="text-2xl font-bold text-stone-900 dark:text-white">
                                    {(data.performanceMetrics.fcp / 1000).toFixed(1)}s
                                </div>
                                <div className="text-[10px] text-stone-400 mt-1">Premier affichage</div>
                            </div>
                            <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-100 dark:border-stone-800">
                                <div className="text-xs text-stone-500 mb-1 uppercase tracking-wider">TBT</div>
                                <div className="text-2xl font-bold text-stone-900 dark:text-white">
                                    {data.performanceMetrics.tbt.toFixed(0)}ms
                                </div>
                                <div className="text-[10px] text-stone-400 mt-1">Temps de blocage</div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-40 text-stone-400">
                            Données de performance indisponibles
                        </div>
                    )}
                </Card>

            </div>
        </div>
    );
}
