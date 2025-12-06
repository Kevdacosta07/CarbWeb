'use client';

interface AnalysisModalProps {
    isOpen: boolean;
    stage: string;
    url?: string;
}

export function AnalysisModal({ isOpen, stage, url }: AnalysisModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-stone-100/90 dark:bg-black/90 backdrop-blur-xl transition-opacity duration-500"></div>

            {/* Modal Content */}
            <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center animate-in fade-in zoom-in-95 duration-300">
                
                {/* Spinner */}
                <div className="relative w-16 h-16 mb-8">
                    <div className="absolute inset-0 border-4 border-stone-200 dark:border-stone-800 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
                </div>

                {/* Status Text */}
                <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-2 tracking-tight">
                    Analyse en cours
                </h3>
                
                {url && (
                    <p className="text-stone-500 dark:text-stone-400 font-mono text-sm mb-8">
                        {url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </p>
                )}

                {/* Stage Indicator */}
                <div className="flex items-center gap-3 px-4 py-2 bg-white dark:bg-stone-900 rounded-full border border-stone-200 dark:border-stone-800 shadow-sm">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-stone-600 dark:text-stone-300">
                        {stage || 'Initialisation...'}
                    </span>
                </div>

            </div>
        </div>
    );
}
