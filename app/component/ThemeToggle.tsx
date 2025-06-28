'use client';

import { useState } from 'react';

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(true);

    const toggleTheme = () => {
        setIsDark(!isDark);
        // Pour l'instant on garde toujours le thème noir
        // Tu peux implémenter la logique de changement si nécessaire
    };

    return (
        <button
            onClick={toggleTheme}
            className="relative w-16 h-8 glass-light rounded-full p-1 transition-all duration-300 hover:bg-white/10"
            aria-label="Changer le thème"
        >
            <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-lg transform translate-x-8 transition-transform duration-300 flex items-center justify-center">
                <span className="text-xs">🌙</span>
            </div>
        </button>
    );
}