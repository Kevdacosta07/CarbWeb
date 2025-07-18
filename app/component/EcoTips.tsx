
export function EcoTips() {
    const tips = [
        {
            icon: '🖼️',
            title: 'Optimisation d\'Images',
            description: 'Utilisez WebP/AVIF, compressez sans perte de qualité et implémentez le lazy loading pour vos médias.',
            impact: '-60%',
            color: 'from-emerald-400 to-emerald-600',
            techniques: ['Format WebP/AVIF', 'Compression intelligente', 'Lazy loading', 'Responsive images']
        },
        {
            icon: '⚡',
            title: 'Code Minifié',
            description: 'Réduisez drastiquement la taille de vos fichiers CSS/JS et supprimez le code mort automatiquement.',
            impact: '-40%',
            color: 'from-blue-400 to-blue-600',
            techniques: ['Minification CSS/JS', 'Tree shaking', 'Code splitting', 'Compression Gzip/Brotli']
        },
        {
            icon: '🌐',
            title: 'CDN Intelligent',
            description: 'Distribuez vos ressources via un réseau global pour réduire la latence et les émissions de transport.',
            impact: '-30%',
            color: 'from-purple-400 to-purple-600',
            techniques: ['Mise en cache CDN', 'Géolocalisation', 'HTTP/2 Push', 'Edge computing']
        },
        {
            icon: '🎯',
            title: 'Chargement Adaptatif',
            description: 'Implémentez le lazy loading, la compression Brotli et le cache intelligent pour optimiser les performances.',
            impact: '-25%',
            color: 'from-teal-400 to-teal-600',
            techniques: ['Lazy loading', 'Critical CSS', 'Preload/Prefetch', 'Service Workers']
        }
    ];

    return (
        <div className="glass-light rounded-2xl sm:rounded-3xl p-6 sm:p-12">
            <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
                    🌱 Guide de l'Éco-Conception
                </h2>
                <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
                    Techniques avancées pour transformer votre site en champion de la durabilité numérique
                </p>
            </div>

            {/* Grille responsive pour les conseils */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {tips.map((tip, index) => (
                    <div
                        key={index}
                        className="group relative glass rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:bg-white/5 transition-all duration-500"
                    >
                        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                            <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${tip.color} rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0`}>
                                <span className="text-xl sm:text-2xl">{tip.icon}</span>
                            </div>

                            <div className="flex-1 w-full">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                                        {tip.title}
                                    </h3>
                                    <div className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs sm:text-sm font-bold border border-emerald-500/30 self-start sm:self-auto">
                                        {tip.impact} CO₂
                                    </div>
                                </div>

                                <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                                    {tip.description}
                                </p>

                                {/* Techniques - Grille responsive */}
                                <div className="space-y-2">
                                    <div className="text-xs sm:text-sm font-semibold text-emerald-400 mb-2">
                                        Techniques recommandées :
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                                        {tip.techniques.map((technique, idx) => (
                                            <div key={idx} className="flex items-center text-xs text-gray-400">
                                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 flex-shrink-0"></span>
                                                <span className="truncate">{technique}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Effet de brillance au hover */}
                        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                ))}
            </div>

            {/* Section d'information - Layout mobile */}
            <div className="mt-12 sm:mt-16 text-center">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="inline-flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 px-6 sm:px-8 py-4 glass rounded-2xl border border-emerald-500/30">
                        <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></span>
                        <div className="text-center sm:text-left">
                            <div className="text-emerald-300 font-semibold text-sm sm:text-base">Plus de techniques d'optimisation</div>
                            <div className="text-xs sm:text-sm text-gray-400">
                                Consultez notre <span className="text-emerald-400 font-medium">méthodologie complète</span> pour découvrir
                                d'autres stratégies d'éco-conception avancées
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ressources - Grille mobile */}
            <div className="mt-8 sm:mt-12 border-t border-white/10 pt-6 sm:pt-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div className="text-center p-4 glass rounded-xl">
                        <div className="text-2xl mb-2">📚</div>
                        <div className="text-sm font-semibold text-white mb-1">Documentation</div>
                        <div className="text-xs text-gray-400">
                            Guides détaillés pour chaque technique
                        </div>
                    </div>
                    <div className="text-center p-4 glass rounded-xl">
                        <div className="text-2xl mb-2">🛠️</div>
                        <div className="text-sm font-semibold text-white mb-1">Outils</div>
                        <div className="text-xs text-gray-400">
                            Recommandations d'outils d'optimisation
                        </div>
                    </div>
                    <div className="text-center p-4 glass rounded-xl">
                        <div className="text-2xl mb-2">📊</div>
                        <div className="text-sm font-semibold text-white mb-1">Mesure</div>
                        <div className="text-xs text-gray-400">
                            Métriques pour suivre vos progrès
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}