'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { href: '/', label: 'Analyseur' },
        { href: '/methodologie', label: 'Méthodologie' },
        { href: 'https://github.com/Kevdacosta07/CarbWeb', label: 'GitHub', external: true }
    ];

    return (
        <>
            <nav 
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled 
                        ? 'bg-white/80 dark:bg-stone-950/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 py-4' 
                        : 'bg-transparent py-6'
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="group flex items-center gap-2">
                        <div className="w-8 h-8 bg-stone-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-stone-900 font-bold text-lg transition-transform group-hover:rotate-3">
                            C
                        </div>
                        <span className="font-bold text-xl tracking-tight text-stone-900 dark:text-white">
                            CarbWeb<span className="text-emerald-500">.</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                target={item.external ? "_blank" : undefined}
                                className={`text-sm font-medium transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
                                    pathname === item.href 
                                        ? 'text-stone-900 dark:text-white' 
                                        : 'text-stone-500 dark:text-stone-400'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link 
                            href="/"
                            className="px-5 py-2 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                            Lancer l'analyse
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-stone-900 dark:text-white"
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 flex flex-col gap-1.5 items-end">
                            <span className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
                            <span className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-4'}`} />
                            <span className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`} />
                        </div>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div 
                className={`fixed inset-0 z-40 bg-stone-50 dark:bg-stone-950 transition-transform duration-500 ease-in-out md:hidden ${
                    isOpen ? 'translate-y-0' : '-translate-y-full'
                }`}
            >
                <div className="flex flex-col items-center justify-center h-full gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="text-3xl font-bold text-stone-900 dark:text-white hover:text-emerald-500 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
