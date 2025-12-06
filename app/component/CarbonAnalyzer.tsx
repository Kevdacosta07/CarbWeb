'use client';

import { useState } from 'react';
import { URLValidator } from '@/utils/urlValidator';
import { CarbonCalculator } from '@/utils/CarbonCalculator';
import { AnalysisModal } from './AnalysisModal';
import type { CarbonAnalysisResult } from '@/utils/types';

interface CarbonAnalyzerProps {
    onAnalysis: (data: CarbonAnalysisResult) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

export function CarbonAnalyzer({ onAnalysis, isLoading, setIsLoading }: CarbonAnalyzerProps) {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const [analysisStage, setAnalysisStage] = useState('');
    const [currentAnalysisUrl, setCurrentAnalysisUrl] = useState('');
    const [strategy, setStrategy] = useState<'mobile' | 'desktop'>('mobile');

    const analyzeWebsite = async () => {
        if (!url.trim()) {
            setError('Veuillez entrer une URL valide');
            return;
        }

        setError('');
        setAnalysisStage('');
        setIsLoading(true);

        try {
            setAnalysisStage('Validation de l\'URL...');
            await new Promise(resolve => setTimeout(resolve, 500));

            const normalizedUrl = URLValidator.normalizeUrl(url);
            setCurrentAnalysisUrl(normalizedUrl);

            if (!URLValidator.isValidUrl(normalizedUrl)) {
                setError('Format d\'URL invalide');
                return;
            }

            if (URLValidator.isTestDomain(normalizedUrl)) {
                setError('Les domaines de test ne sont pas supportés');
                return;
            }

            setAnalysisStage('Vérification de l\'accessibilité...');
            await new Promise(resolve => setTimeout(resolve, 800));

            const existenceCheck = await URLValidator.checkWebsiteExists(normalizedUrl);

            if (!existenceCheck.exists) {
                setError(existenceCheck.error || 'Site web inaccessible');
                return;
            }

            setAnalysisStage(`Analyse des performances ${strategy === 'mobile' ? 'mobiles' : 'bureau'}...`);
            await new Promise(resolve => setTimeout(resolve, 1000));

            setAnalysisStage('Vérification de l\'hébergement vert...');
            await new Promise(resolve => setTimeout(resolve, 800));

            setAnalysisStage('Calcul de l\'empreinte carbone...');
            await new Promise(resolve => setTimeout(resolve, 1200));

            const analysisResult = await CarbonCalculator.analyzeWebsite(normalizedUrl, strategy);

            setAnalysisStage('Finalisation du rapport...');
            await new Promise(resolve => setTimeout(resolve, 600));

            const resultWithStrategy = {
                ...analysisResult,
                strategy: strategy
            };

            onAnalysis(resultWithStrategy);

        } catch (err: any) {
            console.error('Erreur d\'analyse:', err);
            if (err.message?.includes('Clé API')) {
                setError('Service temporairement indisponible. Vérifiez la configuration API.');
            } else if (err.message?.includes('quota') || err.message?.includes('limit')) {
                setError('Limite API atteinte. Veuillez réessayer plus tard.');
            } else if (err.message?.includes('PageSpeed')) {
                setError('Erreur Google PageSpeed Insights. Réessayez plus tard.');
            } else if (err.message?.includes('network') || err.message?.includes('fetch')) {
                setError('Erreur de connexion. Vérifiez votre internet.');
            } else {
                setError(`Échec de l'analyse: ${err.message || 'Erreur inconnue'}`);
            }
        } finally {
            setIsLoading(false);
            setAnalysisStage('');
            setCurrentAnalysisUrl('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isLoading) {
            analyzeWebsite();
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <AnalysisModal
                isOpen={isLoading && !!analysisStage}
                stage={analysisStage}
                url={currentAnalysisUrl}
            />

            <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                
                <div className="relative bg-white dark:bg-stone-900 rounded-2xl shadow-2xl shadow-stone-200/50 dark:shadow-black/50 border border-stone-200 dark:border-stone-800 p-2 flex flex-col sm:flex-row items-center gap-2">
                    
                    {/* Strategy Selector */}
                    <div className="flex p-1 bg-stone-100 dark:bg-stone-800 rounded-xl shrink-0">
                        <button
                            onClick={() => setStrategy('mobile')}
                            className={`p-2 rounded-lg transition-all ${strategy === 'mobile' ? 'bg-white dark:bg-stone-700 shadow-sm text-stone-900 dark:text-white' : 'text-stone-400 hover:text-stone-600'}`}
                            title="Analyse Mobile"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
                        </button>
                        <button
                            onClick={() => setStrategy('desktop')}
                            className={`p-2 rounded-lg transition-all ${strategy === 'desktop' ? 'bg-white dark:bg-stone-700 shadow-sm text-stone-900 dark:text-white' : 'text-stone-400 hover:text-stone-600'}`}
                            title="Analyse Bureau"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                        </button>
                    </div>

                    {/* Input */}
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Entrez l'URL du site web..."
                        className="w-full bg-transparent px-4 py-3 outline-none text-lg text-stone-900 dark:text-white placeholder-stone-400"
                        disabled={isLoading}
                    />

                    {/* Button */}
                    <button
                        onClick={analyzeWebsite}
                        disabled={isLoading || !url.trim()}
                        className="w-full sm:w-auto px-6 py-3 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                    >
                        {isLoading ? 'Analyse...' : 'Analyser'}
                    </button>
                </div>
            </div>

            {error && (
                <div className="mt-4 text-center animate-in fade-in slide-in-from-top-2">
                    <span className="text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full border border-red-100 dark:border-red-900/30">
                        {error}
                    </span>
                </div>
            )}
        </div>
    );
}
