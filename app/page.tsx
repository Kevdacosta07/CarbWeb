'use client';

import { useState, useEffect } from 'react';
import { CarbonAnalyzer } from '@/app/component/CarbonAnalyzer';
import { CarbonResults } from '@/app/component/CarbonResults';
import { EcoTips } from '@/app/component/EcoTips';
import { TechnicalLink } from '@/app/component/TechnicalLink';
import type { CarbonAnalysisResult } from '@/utils/types';
import Link from 'next/link';

export default function Home() {
    const [analysisData, setAnalysisData] = useState<CarbonAnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleAnalysis = (data: CarbonAnalysisResult) => {
        setAnalysisData(data);
    };

    const resetAnalysis = () => {
        setAnalysisData(null);
        // Scroll retour vers le haut après reset
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Scroll automatique vers les résultats quand l'analyse est terminée
    useEffect(() => {
        if (analysisData) {
            // Petit délai pour laisser le temps au DOM de se mettre à jour
            setTimeout(() => {
                const resultsElement = document.getElementById('carbon-results');
                if (resultsElement) {
                    resultsElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                    });
                }
            }, 300);
        }
    }, [analysisData]);

    return (
        <div className="min-h-screen bg-black relative">
            {/* Background Effects - Optimisés pour mobile */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute top-3/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/2 left-1/2 w-48 h-48 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
                {!analysisData ? (
                    <>
                        {/* Navigation rapide */}
                        <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 glass-light rounded-2xl p-3 border border-white/20 backdrop-blur-xl" aria-label="Navigation rapide">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => scrollToSection('analyzer-section')}
                                    className="px-3 py-2 rounded-xl text-white hover:bg-emerald-600 transition-colors text-sm font-medium"
                                    title="Analyser un site"
                                >
                                    🌍 Analyser
                                </button>
                                <div className="w-px h-6 bg-white/20"></div>
                                <button
                                    onClick={() => scrollToSection('features-section')}
                                    className="px-3 py-2 rounded-xl text-white hover:bg-blue-600 transition-colors text-sm font-medium"
                                    title="Fonctionnalités"
                                >
                                    📊 Fonctions
                                </button>
                                <div className="w-px h-6 bg-white/20"></div>
                                <button
                                    onClick={() => scrollToSection('stats-section')}
                                    className="px-3 py-2 rounded-xl text-white hover:bg-purple-600 transition-colors text-sm font-medium"
                                    title="Statistiques"
                                >
                                    📈 Stats
                                </button>
                                <div className="w-px h-6 bg-white/20"></div>
                                <button
                                    onClick={() => scrollToSection('tips-section')}
                                    className="px-3 py-2 rounded-xl text-white hover:bg-orange-600 transition-colors text-sm font-medium"
                                    title="Conseils éco"
                                >
                                    💡 Conseils
                                </button>
                            </div>
                        </nav>

                        {/* Hero Section optimisé mobile */}
                        <header className="text-center mb-12 sm:mb-20">
                            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full glass-light text-emerald-300 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
                                <span className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 rounded-full mr-2 sm:mr-3"></span>
                                <span className="hidden sm:inline">APIs Officielles • Calculs Scientifiques Réels</span>
                                <span className="sm:hidden">APIs Officielles</span>
                            </div>

                            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 leading-tight px-2">
                                <span className="text-white">Calculer l'</span>
                                <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
                                    Empreinte Carbone
                                </span>
                                <br />
                                <span className="text-white">d'un Site Web</span>
                            </h1>

                            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4">
                                <strong>Calculez gratuitement l'empreinte carbone de votre site web</strong> avec notre outil scientifique.
                                <span className="hidden sm:inline"> Analyse en temps réel basée sur les <span className="text-emerald-400 font-semibold">APIs officielles Google PageSpeed Insights</span> et
                                les <span className="text-blue-400 font-semibold">facteurs CO₂ IEA 2024</span> pour des résultats précis et fiables.</span>
                            </p>

                            {/* Badges mobiles optimisés */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 px-4 mb-8">
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                                    <span>Google PageSpeed</span>
                                </div>
                                <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                                    <span>Green Web Foundation</span>
                                </div>
                                <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                                    <span>Facteurs CO₂ IEA 2024</span>
                                </div>
                            </div>

                            {/* Bouton d'appel à l'action vers la méthodologie */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <button
                                    onClick={() => scrollToSection('analyzer-section')}
                                    className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/25"
                                >
                                    🚀 Analyser mon site maintenant
                                </button>
                                <Link
                                    href="/methodologie"
                                    className="px-6 py-3 glass-light text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/20 hover:border-white/40"
                                >
                                    📚 Voir la méthodologie scientifique
                                </Link>
                            </div>
                        </header>

                        {/* Main Analyzer */}
                        <section id="analyzer-section" className="mb-16 sm:mb-24" aria-labelledby="analyzer-title">
                            <CarbonAnalyzer
                                onAnalysis={handleAnalysis}
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                            />
                        </section>

                        {/* Features Grid - Grille responsive */}
                        <section id="features-section" className="mb-16 sm:mb-24" aria-labelledby="features-title">
                            <div className="text-center mb-12">
                                <h2 id="features-title" className="text-2xl sm:text-3xl font-bold text-white mb-4">
                                    📊 Fonctionnalités Scientifiques
                                </h2>
                                <p className="text-gray-300 max-w-3xl mx-auto">
                                    Notre méthodologie combine données réelles et calculs scientifiques pour des résultats précis
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                                <article className="group glass-light rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:bg-emerald-500/5 transition-all duration-500">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-white text-xl sm:text-2xl">📊</span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Données Réelles</h3>
                                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                                        Analyse basée sur les métriques exactes de <TechnicalLink
                                        href="https://developers.google.com/speed/pagespeedonline/"
                                        description="API de Google pour analyser les performances web"
                                    >
                                        Google PageSpeed Insights
                                    </TechnicalLink>. Taille réelle des fichiers, nombre de requêtes, temps de chargement.
                                    </p>
                                    <div className="mt-4 sm:mt-6 text-emerald-400 font-semibold text-xs sm:text-sm">
                                        → Mesures en temps réel
                                    </div>
                                </article>

                                <article className="group glass-light rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:bg-blue-500/5 transition-all duration-500">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-white text-xl sm:text-2xl">🔬</span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Calculs Scientifiques</h3>
                                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                                        Facteurs de conversion CO₂ officiels de l'<TechnicalLink
                                        href="https://www.iea.org/data-and-statistics/data-product/emissions-factors-2024"
                                        description="Agence Internationale de l'Énergie - Base de données des facteurs d'émissions 2024"
                                    >
                                        IEA 2024
                                    </TechnicalLink>. Méthodologie transparente et reproductible.
                                    </p>
                                    <div className="mt-4 sm:mt-6 text-blue-400 font-semibold text-xs sm:text-sm">
                                        → Standards internationaux
                                    </div>
                                </article>

                                <article className="group glass-light rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:bg-purple-500/5 transition-all duration-500">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-white text-xl sm:text-2xl">🌱</span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Hébergement Vert</h3>
                                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                                        Vérification automatique via <TechnicalLink
                                        href="https://www.thegreenwebfoundation.org/"
                                        description="Base de données mondiale des hébergeurs utilisant des énergies renouvelables"
                                    >
                                        Green Web Foundation
                                    </TechnicalLink> pour identifier les sites éco-responsables.
                                    </p>
                                    <div className="mt-4 sm:mt-6 text-purple-400 font-semibold text-xs sm:text-sm">
                                        → Base de données mondiale
                                    </div>
                                </article>
                            </div>

                            {/* Call-to-action vers méthodologie */}
                            <div className="text-center mt-12">
                                <Link
                                    href="/methodologie"
                                    className="inline-flex items-center gap-3 px-6 py-4 glass-light text-white font-medium rounded-2xl hover:bg-white/10 transition-all duration-300 border border-white/20 hover:border-white/40 group"
                                >
                                    <span className="text-xl">📚</span>
                                    <div className="text-left">
                                        <div className="font-semibold">Découvrir notre méthodologie scientifique</div>
                                        <div className="text-sm text-gray-400 group-hover:text-gray-300">Sources • Formules • Validations académiques</div>
                                    </div>
                                    <span className="text-white/60 group-hover:text-white transition-colors">→</span>
                                </Link>
                            </div>
                        </section>

                        {/* Stats Section - Grille mobile optimisée */}
                        <section id="stats-section" className="glass-light rounded-2xl sm:rounded-3xl p-6 sm:p-12 mb-16 sm:mb-24" aria-labelledby="stats-title">
                            <div className="text-center mb-8 sm:mb-12">
                                <h2 id="stats-title" className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">📈 Impact Global du Numérique</h2>
                                <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
                                    Comprendre l'importance du <strong>calcul d'empreinte carbone des sites web</strong> dans le contexte environnemental actuel
                                </p>
                            </div>

                            {/* Grille de stats mobile-first */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-8 sm:mb-12">
                                <div className="text-center">
                                    <div className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent mb-1 sm:mb-2">
                                        4%
                                    </div>
                                    <div className="text-gray-300 font-medium mb-1 text-sm sm:text-base">Émissions mondiales</div>
                                    <div className="text-xs text-gray-400 px-2 sm:px-3 py-1 rounded-full bg-gray-800/50">
                                        <span className="hidden sm:inline">Le numérique représente 4% des émissions globales de CO₂</span>
                                        <span className="sm:hidden">Numérique global</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent mb-1 sm:mb-2">
                                        0.8g
                                    </div>
                                    <div className="text-gray-300 font-medium mb-1 text-sm sm:text-base">CO₂ médiane web</div>
                                    <div className="text-xs text-gray-400 px-2 sm:px-3 py-1 rounded-full bg-gray-800/50">
                                        <span className="hidden sm:inline">Émission moyenne par page vue (Website Carbon Calculator)</span>
                                        <span className="sm:hidden">Par page vue</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent mb-1 sm:mb-2">
                                        70%
                                    </div>
                                    <div className="text-gray-300 font-medium mb-1 text-sm sm:text-base">Réduction possible</div>
                                    <div className="text-xs text-gray-400 px-2 sm:px-3 py-1 rounded-full bg-gray-800/50">
                                        <span className="hidden sm:inline">Potentiel d'optimisation avec les bonnes pratiques</span>
                                        <span className="sm:hidden">Optimisation</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-teal-400 to-teal-300 bg-clip-text text-transparent mb-1 sm:mb-2">
                                        475g/kWh
                                    </div>
                                    <div className="text-gray-300 font-medium mb-1 text-sm sm:text-base">Facteur CO₂ global</div>
                                    <div className="text-xs text-gray-400 px-2 sm:px-3 py-1 rounded-full bg-gray-800/50">
                                        <span className="hidden sm:inline">Moyenne mondiale électricité (IEA 2024)</span>
                                        <span className="sm:hidden">IEA 2024</span>
                                    </div>
                                </div>
                            </div>

                            {/* Informations importantes */}
                            <div className="mt-6 sm:mt-8 p-4 rounded-xl bg-orange-900/20 border border-orange-500/30">
                                <div className="flex items-start gap-3">
                                    <span className="text-orange-400 text-lg mt-0.5">⚠️</span>
                                    <div>
                                        <h3 className="font-semibold text-orange-300 mb-1 text-sm sm:text-base">Informations importantes</h3>
                                        <div className="text-xs sm:text-sm text-orange-200/80 space-y-1">
                                            <div>• Outil gratuit utilisant des APIs avec limitations de quota</div>
                                            <div>• En cas d'erreur, réessayez dans quelques minutes</div>
                                            <div className="hidden sm:block">• Analyses basées sur des données publiques réelles</div>
                                            <div className="hidden sm:block">• Calculateur scientifique avec méthodologie transparente</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Eco Tips */}
                        <section id="tips-section" aria-labelledby="tips-title">
                            <div className="text-center mb-12">
                                <h2 id="tips-title" className="text-2xl sm:text-3xl font-bold text-white mb-4">
                                    💡 Conseils pour Réduire votre Impact
                                </h2>
                                <p className="text-gray-300 max-w-3xl mx-auto mb-8">
                                    Découvrez les meilleures pratiques pour optimiser l'empreinte carbone de votre site web
                                </p>
                            </div>
                            <EcoTips />
                        </section>

                        {/* Footer */}
                        <footer className="mt-12 sm:mt-16 py-6 sm:py-8 text-center">
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-4">
                                <span>Fait avec</span>
                                <span className="text-red-400 animate-pulse">❤️</span>
                                <span>par</span>
                                <a
                                    href="https://helveit.ch"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-200 hover:underline"
                                >
                                    Helveit
                                </a>
                            </div>
                            <div className="text-center">
                                <Link
                                    href="/methodologie"
                                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 hover:underline text-sm"
                                >
                                    📚 Consulter la méthodologie complète
                                </Link>
                            </div>
                        </footer>
                    </>
                ) : (
                    <div id="carbon-results">
                        <CarbonResults data={analysisData} onReset={resetAnalysis} />
                    </div>
                )}
            </div>
        </div>
    );
}