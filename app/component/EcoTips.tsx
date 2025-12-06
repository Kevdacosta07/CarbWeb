'use client';

export function EcoTips() {
    const tips = [
        {
            icon: '🖼️',
            title: 'Optimisation des Images',
            description: 'Utilisez les formats WebP/AVIF, compressez sans perte de qualité et implémentez le chargement différé (lazy loading).',
            impact: '-60%',
            techniques: ['Formats WebP/AVIF', 'Compression Intelligente', 'Lazy Loading', 'Images Responsives']
        },
        {
            icon: '⚡',
            title: 'Code Minifié',
            description: 'Réduisez drastiquement la taille des fichiers CSS/JS et supprimez automatiquement le code mort.',
            impact: '-40%',
            techniques: ['Minification CSS/JS', 'Tree Shaking', 'Code Splitting', 'Compression Gzip/Brotli']
        },
        {
            icon: '🌐',
            title: 'CDN Intelligent',
            description: 'Distribuez vos ressources via un réseau mondial pour réduire la latence et les émissions liées au transport.',
            impact: '-30%',
            techniques: ['Mise en cache CDN', 'Géolocalisation', 'HTTP/2 Push', 'Edge Computing']
        },
        {
            icon: '🎯',
            title: 'Chargement Adaptatif',
            description: 'Implémentez le chargement différé, la compression Brotli et la mise en cache intelligente pour optimiser les performances.',
            impact: '-25%',
            techniques: ['Lazy Loading', 'CSS Critique', 'Preload/Prefetch', 'Service Workers']
        }
    ];

    return (
        <div className="bg-stone-100 dark:bg-stone-900 rounded-2xl p-8 sm:p-12 border border-stone-200 dark:border-stone-800">
            <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mb-4">
                    🌱 Guide d'Éco-Conception
                </h2>
                <p className="text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
                    Techniques avancées pour transformer votre site web en champion de la durabilité numérique.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {tips.map((tip, index) => (
                    <div key={index} className="group bg-white dark:bg-black p-6 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5">
                        <div className="flex items-start justify-between mb-4">
                            <div className="text-4xl mb-2">{tip.icon}</div>
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                                {tip.impact} CO₂
                            </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {tip.title}
                        </h3>
                        
                        <p className="text-stone-600 dark:text-stone-400 text-sm mb-6 leading-relaxed">
                            {tip.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {tip.techniques.map((tech, idx) => (
                                <span key={idx} className="text-xs px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
