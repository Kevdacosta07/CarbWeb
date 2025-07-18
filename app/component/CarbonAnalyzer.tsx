
'use client';

import { useState } from 'react';
import { URLValidator } from '@/utils/urlValidator';
import { CarbonCalculator } from '@/utils/CarbonCalculator';
import { AnalysisModal } from './AnalysisModal';
import { TechnicalLink } from './TechnicalLink';
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

    // Choix mobile/desktop
    const [strategy, setStrategy] = useState<'mobile' | 'desktop'>('mobile');

    const analyzeWebsite = async () => {
        if (!url.trim()) {
            setError('Veuillez entrer une URL');
            return;
        }

        setError('');
        setAnalysisStage('');
        setIsLoading(true);

        try {
            // Étape 1: Validation URL
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

            // Étape 2: Vérification accessibilité
            setAnalysisStage('Vérification de l\'accessibilité du site...');
            await new Promise(resolve => setTimeout(resolve, 800));

            const existenceCheck = await URLValidator.checkWebsiteExists(normalizedUrl);

            if (!existenceCheck.exists) {
                setError(existenceCheck.error || 'Site inaccessible');
                return;
            }

            // Étape 3: Analyse PageSpeed Insights
            setAnalysisStage(`Analyse des performances ${strategy === 'mobile' ? 'mobiles' : 'desktop'} via Google PageSpeed...`);
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Étape 4: Vérification hébergement vert
            setAnalysisStage('Vérification de l\'hébergement vert...');
            await new Promise(resolve => setTimeout(resolve, 800));

            // Étape 5: Calcul empreinte carbone
            setAnalysisStage('Calcul de l\'empreinte carbone...');
            await new Promise(resolve => setTimeout(resolve, 1200));

            // Passer la stratégie au CarbonCalculator
            const analysisResult = await CarbonCalculator.analyzeWebsite(normalizedUrl, strategy);

            // Étape 6: Finalisation
            setAnalysisStage('Finalisation de l\'analyse...');
            await new Promise(resolve => setTimeout(resolve, 600));

            console.log(`✅ Analyse ${strategy} terminée:`, {
                url: analysisResult.url,
                strategy: strategy,
                co2PerVisit: analysisResult.co2PerVisit,
                score: analysisResult.score,
                grade: analysisResult.grade,
                isGreenHosted: analysisResult.isGreenHosted
            });

            // Ajouter la stratégie au résultat
            const resultWithStrategy = {
                ...analysisResult,
                strategy: strategy
            };

            onAnalysis(resultWithStrategy);

        } catch (err: any) {
            console.error('❌ Erreur lors de l\'analyse:', err);

            // Gestion spécifique des erreurs
            if (err.message?.includes('Clé API')) {
                setError('Service d\'analyse temporairement indisponible. Vérifiez la configuration API.');
            } else if (err.message?.includes('quota') || err.message?.includes('limit')) {
                setError('Limite d\'utilisation API atteinte. Réessayez dans quelques minutes.');
            } else if (err.message?.includes('PageSpeed')) {
                setError('Erreur du service Google PageSpeed Insights. Réessayez plus tard.');
            } else if (err.message?.includes('network') || err.message?.includes('fetch')) {
                setError('Erreur de connexion. Vérifiez votre connection internet.');
            } else {
                setError(`Erreur lors de l'analyse: ${err.message || 'Erreur inconnue'}`);
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

    // Exemples d'URLs pour différents types de pages
    const getExampleUrls = () => [
        { url: 'helveit.ch', type: 'Accueil', icon: '🏠' },
        { url: 'stackoverflow.com', type: 'Communauté', icon: '💬' },
        { url: 'wikipedia.org', type: 'Contenu', icon: '📄' },
        { url: 'google.com', type: 'Moteur', icon: '🔍' },
        { url: 'youtube.com', type: 'Média', icon: '🎥' }
    ];

    return (
        <div className="relative">
            {/* Analysis Modal avec URL */}
            <AnalysisModal
                isOpen={isLoading && !!analysisStage}
                stage={analysisStage}
                url={currentAnalysisUrl}
            />

            {/* Main Card */}
            <div className="relative p-8 rounded-3xl glass-light border border-white/10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 animate-glow">
                        <span className="text-white text-2xl">🌍</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Analyseur d'Empreinte Carbone
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Entrez l'URL complète de <span className="text-emerald-400 font-semibold">n'importe quelle page web</span> pour découvrir son impact environnemental réel et recevoir des recommandations scientifiques.
                    </p>
                </div>

                {/* ✨ NOUVEAU : Sélecteur Mobile/Desktop */}
                <div className="max-w-2xl mx-auto mb-6">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-sm text-gray-400">Type d'analyse :</span>
                        <div className="flex bg-gray-800/50 rounded-xl p-1 border border-white/10">
                            <button
                                onClick={() => setStrategy('mobile')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                                    strategy === 'mobile'
                                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                                }`}
                                disabled={isLoading}
                            >
                                <span className="text-lg">📱</span>
                                Mobile
                            </button>
                            <button
                                onClick={() => setStrategy('desktop')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                                    strategy === 'desktop'
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                                }`}
                                disabled={isLoading}
                            >
                                <span className="text-lg">💻</span>
                                Desktop
                            </button>
                        </div>
                    </div>

                    {/* Info sur la différence */}
                    <div className="text-center">
                        <p className="text-xs text-gray-400">
                            {strategy === 'mobile' ? (
                                <>📱 <span className="text-emerald-400">Mobile</span> : Connexion 4G, écran tactile, performance optimisée</>
                            ) : (
                                <>💻 <span className="text-blue-400">Desktop</span> : Connexion filaire, grand écran, ressources étendues</>
                            )}
                        </p>
                    </div>
                </div>

                {/* Input Section */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="relative">
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="https://example.com ou example.com"
                            className="w-full px-6 py-4 pr-32 text-lg rounded-2xl glass border border-white/20 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all duration-300 text-white placeholder-gray-400"
                            disabled={isLoading}
                        />
                        <button
                            onClick={analyzeWebsite}
                            disabled={isLoading || !url.trim()}
                            className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span className="hidden sm:inline">Analyse...</span>
                                </div>
                            ) : (
                                <span>Analyser</span>
                            )}
                        </button>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="mt-4 p-4 rounded-xl bg-red-900/30 border border-red-500/30">
                            <div className="flex items-center gap-3 text-red-300">
                                <span className="text-lg">⚠️</span>
                                <span className="font-medium">{error}</span>
                            </div>
                        </div>
                    )}

                    {/* URL Format Helper */}
                    <div className="mt-3 p-3 glass rounded-xl border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-blue-400 text-sm">💡</span>
                            <span className="text-blue-300 text-sm font-medium">Formats d'URL supportés</span>
                        </div>
                        <div className="text-xs text-blue-200/80 space-y-1">
                            <div>• <span className="text-blue-300">Domaines :</span> example.com, blog.example.com</div>
                            <div>• <span className="text-blue-300">Pages complètes :</span> https://example.com/about</div>
                            <div>• <span className="text-blue-300">Articles :</span> example.com/blog/mon-article</div>
                        </div>
                    </div>
                </div>

                {/* Example URLs */}
                <div className="text-center mb-8">
                    <p className="text-sm text-gray-400 mb-4">Exemples de sites à analyser :</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        {getExampleUrls().map((example, index) => (
                            <button
                                key={index}
                                onClick={() => setUrl(example.url)}
                                className="group p-3 rounded-xl glass-light border border-white/10 hover:border-emerald-500/30 transition-all duration-300 hover:scale-105"
                                disabled={isLoading}
                            >
                                <div className="text-lg mb-1">{example.icon}</div>
                                <div className="text-xs text-gray-300 group-hover:text-white font-medium">
                                    {example.type}
                                </div>
                                <div className="text-xs text-emerald-400 font-mono mt-1">
                                    {example.url}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ✨ NOUVEAU : Section informative sur mobile vs desktop */}
                <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30">
                    <div className="flex items-start gap-3">
                        <span className="text-purple-400 text-lg mt-0.5">🔄</span>
                        <div>
                            <h3 className="font-semibold text-purple-300 mb-2 text-sm">Pourquoi analyser mobile ET desktop ?</h3>
                            <div className="text-xs text-purple-200/80 space-y-1">
                                <div>• <strong>Mobile</strong> : Connexion plus lente, moins de cache, plus d'impact carbone</div>
                                <div>• <strong>Desktop</strong> : Plus de ressources mais connexion stable</div>
                                <div>• <strong>Différences</strong> : Jusqu'à 50% d'écart selon le site</div>
                                <div>• <strong>Optimisation</strong> : Stratégies spécifiques à chaque plateforme</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technical Note */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        Analyse basée sur <TechnicalLink
                        href="https://developers.google.com/speed/pagespeedonline/"
                        description="API Google PageSpeed Insights pour l'analyse des performances web"
                    >
                        Google PageSpeed Insights
                    </TechnicalLink> • Calculs conformes au <TechnicalLink
                        href="https://sustainablewebdesign.org/"
                        description="Modèle de conception web durable pour le calcul d'empreinte carbone"
                    >
                        Sustainable Web Design Model
                    </TechnicalLink>
                    </p>
                </div>
            </div>
        </div>
    );
}