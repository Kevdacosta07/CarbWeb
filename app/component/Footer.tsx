'use client';

import Link from 'next/link';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-stone-200 dark:border-stone-800 bg-[#FDFCF8] dark:bg-[#0C0C0C] mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    
                    {/* Logo / Copyright */}
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <div className="text-lg font-bold tracking-tight">
                            Carb<span className="text-emerald-600 dark:text-emerald-500">Web</span>
                        </div>
                        <p className="text-sm text-stone-500 dark:text-stone-400">
                            © {currentYear} Tous droits réservés.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-6 text-sm font-medium text-stone-600 dark:text-stone-400">
                        <Link href="/methodologie" className="hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors">
                            Méthodologie
                        </Link>
                        <a 
                            href="https://github.com/Kevdacosta07/carbweb" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors"
                        >
                            GitHub
                        </a>
                    </div>

                    {/* Credits */}
                    <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
                        <span>Développé par</span>
                        <a 
                            href="https://helveit.ch" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-semibold text-stone-900 dark:text-stone-100 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors"
                        >
                            Helveit
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
