
'use client';

import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
    const [theme, setTheme] = useState<Theme>('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // D'abord marquer comme monté
        setMounted(true);

        // Ensuite récupérer le thème initial
        const storedTheme = localStorage.getItem('theme') as Theme;
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');

        // Appliquer le thème et mettre à jour l'état
        applyTheme(initialTheme);
        setTheme(initialTheme);

        // Log pour debug
        console.log('Theme initialized:', initialTheme);
    }, []);

    const applyTheme = (newTheme: Theme) => {
        console.log('Applying theme:', newTheme);
        const root = document.documentElement;

        if (newTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    };

    const toggleTheme = () => {
        if (!mounted) {
            console.log('Not mounted yet, skipping toggle');
            return;
        }

        const newTheme = theme === 'light' ? 'dark' : 'light';
        console.log('Toggling theme from', theme, 'to', newTheme);

        // Appliquer le thème immédiatement
        applyTheme(newTheme);

        // Mettre à jour l'état
        setTheme(newTheme);

        // Stocker la préférence
        localStorage.setItem('theme', newTheme);
    };

    return { theme, toggleTheme, mounted };
}