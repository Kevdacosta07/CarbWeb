
'use client';

interface AnalysisModalProps {
    isOpen: boolean;
    stage: string;
    url?: string;
    onClose?: () => void;
}

export function AnalysisModal({ isOpen, stage, url, onClose }: AnalysisModalProps) {
    if (!isOpen) return null;

    // ✨ CORRIGÉ : Liste des étapes dynamique
    const stages = [
        'Validation de l\'URL...',
        'Vérification de l\'accessibilité du site...',
        // ✨ Pattern flexible pour détecter l'étape PageSpeed (mobile OU desktop)
        'Analyse des performances',
        'Vérification de l\'hébergement vert...',
        'Calcul de l\'empreinte carbone...',
        'Finalisation de l\'analyse...'
    ];

    // ✨ MODIFIÉ : Détection d'étape plus flexible
    const getCurrentStageIndex = (currentStage: string) => {
        if (currentStage.includes('Validation de l\'URL')) return 0;
        if (currentStage.includes('Vérification de l\'accessibilité')) return 1;
        if (currentStage.includes('Analyse des performances')) return 2; // Capture mobile ET desktop
        if (currentStage.includes('Vérification de l\'hébergement')) return 3;
        if (currentStage.includes('Calcul de l\'empreinte')) return 4;
        if (currentStage.includes('Finalisation')) return 5;
        return -1;
    };

    const currentStageIndex = getCurrentStageIndex(stage);
    const progress = currentStageIndex >= 0 ? ((currentStageIndex + 1) / stages.length) * 100 : 0;

    // Icônes et couleurs pour chaque étape
    const getStageInfo = (stageName: string, isCurrentStage: boolean = false) => {
        if (stageName.includes('Validation')) {
            return { icon: '🔗', color: 'text-blue-400' };
        } else if (stageName.includes('Vérification de l\'accessibilité')) {
            return { icon: '🌐', color: 'text-green-400' };
        } else if (stageName.includes('Analyse des performances') || isCurrentStage && stage.includes('Analyse des performances')) {
            // ✨ Détection dynamique mobile/desktop
            if (stage.includes('mobiles')) {
                return { icon: '📱', color: 'text-purple-400' };
            } else if (stage.includes('desktop')) {
                return { icon: '💻', color: 'text-purple-400' };
            }
            return { icon: '📊', color: 'text-purple-400' };
        } else if (stageName.includes('Vérification de l\'hébergement')) {
            return { icon: '🌱', color: 'text-teal-400' };
        } else if (stageName.includes('Calcul de l\'empreinte')) {
            return { icon: '⚗️', color: 'text-emerald-400' };
        } else if (stageName.includes('Finalisation')) {
            return { icon: '✨', color: 'text-yellow-400' };
        }
        return { icon: '🔍', color: 'text-emerald-400' };
    };

    const currentStage = getStageInfo(stage, true);

    // Fonction pour extraire et formatter le domaine
    const getDisplayUrl = (fullUrl: string) => {
        if (!fullUrl) return '';

        try {
            const urlObj = new URL(fullUrl.startsWith('http') ? fullUrl : `https://${fullUrl}`);
            return urlObj.hostname;
        } catch {
            return fullUrl;
        }
    };

    const displayUrl = getDisplayUrl(url || '');

    // ✨ NOUVEAU : Fonction pour afficher le nom de l'étape avec le bon texte
    const getDisplayStage = (stageName: string, index: number) => {
        if (index === 2) { // Étape PageSpeed
            // Si c'est l'étape courante, utiliser le texte exact
            if (currentStageIndex === 2) {
                return stage;
            }
            // Sinon, texte générique
            return 'Analyse des performances via Google PageSpeed...';
        }
        return stageName === 'Analyse des performances' ? 'Analyse des performances via Google PageSpeed...' : stageName;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop simple */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            {/* Modal compact */}
            <div className="relative glass-light rounded-2xl p-6 w-full max-w-md border border-white/20 shadow-xl">
                {/* Header avec URL */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center animate-pulse">
                        <span className="text-white text-xl">🌍</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white">Analyse en cours</h3>
                        {/* Affichage de l'URL */}
                        {displayUrl && (
                            <div className="text-sm text-emerald-400 font-medium truncate">
                                {displayUrl}
                            </div>
                        )}
                        <p className="text-xs text-gray-400">Calcul empreinte carbone</p>
                    </div>
                </div>

                {/* Barre de progression */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">Progression</span>
                        <span className="text-sm text-emerald-400 font-semibold">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Étape actuelle */}
                <div className="mb-6 p-3 glass rounded-xl border border-emerald-500/20">
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                        <div className="flex-1">
                            <div className="text-emerald-300 font-medium text-sm">{stage}</div>
                            <div className="text-emerald-200/60 text-xs">Étape {currentStageIndex + 1}/6</div>
                        </div>
                        <span className={`text-xl ${currentStage.color}`}>{currentStage.icon}</span>
                    </div>
                </div>

                {/* Liste des étapes compacte */}
                <div className="space-y-2">
                    {stages.map((stepName, index) => {
                        const isCompleted = index < currentStageIndex;
                        const isCurrent = index === currentStageIndex;
                        const stepInfo = getStageInfo(stepName, isCurrent);
                        const displayText = getDisplayStage(stepName, index);

                        return (
                            <div key={index} className={`flex items-center gap-3 text-xs transition-all duration-300 ${
                                isCompleted ? 'opacity-75' : isCurrent ? 'opacity-100' : 'opacity-40'
                            }`}>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                                    isCompleted
                                        ? 'bg-emerald-500 text-white'
                                        : isCurrent
                                            ? 'bg-emerald-400 text-white'
                                            : 'bg-gray-600 text-gray-400'
                                }`}>
                                    {isCompleted ? '✓' : index + 1}
                                </div>
                                <div className="flex-1">
                                    <div className={`font-medium transition-colors duration-300 ${
                                        isCompleted
                                            ? 'text-emerald-300'
                                            : isCurrent
                                                ? 'text-white'
                                                : 'text-gray-500'
                                    }`}>
                                        {displayText.replace('...', '')}
                                    </div>
                                </div>
                                <span className={`text-sm ${stepInfo.color} ${isCurrent ? 'animate-pulse' : ''}`}>
                                    {stepInfo.icon}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Temps estimé */}
                <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                        <div className="flex gap-1">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"
                                    style={{animationDelay: `${i * 0.2}s`}}
                                ></div>
                            ))}
                        </div>
                        <span>Temps estimé : 15-30 secondes</span>
                    </div>
                </div>
            </div>
        </div>
    );
}