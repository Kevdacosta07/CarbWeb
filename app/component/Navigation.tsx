'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        {
            href: '/',
            label: 'Analyseur',
            icon: '🌍',
            description: 'Analyser l\'empreinte carbone'
        },
        {
            href: '/methodologie',
            label: 'Méthodologie',
            icon: '📚',
            description: 'Sources et calculs scientifiques'
        }
    ];

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 backdrop-blur-xl">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                                <span className="text-white text-lg">🌍</span>
                            </div>
                            <div>
                                <h1 className="text-white font-bold text-lg">CarbWeb</h1>
                                <p className="text-gray-400 text-xs">Analyseur d'empreinte carbone</p>
                            </div>
                        </Link>

                        {/* Desktop Menu - Navigation en ligne */}
                        <div className="hidden md:flex items-center gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`group relative px-4 py-2 rounded-xl transition-all duration-300 ${
                                        pathname === item.href
                                            ? 'bg-emerald-800 text-white'
                                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{item.icon}</span>
                                        <span className="font-medium">{item.label}</span>
                                    </div>

                                    {/* Tooltip */}
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/20">
                                        {item.description}
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                            aria-label={isOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
                isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}>
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />

                {/* Menu Panel */}
                <div className={`absolute top-16 left-4 right-4 glass-light rounded-2xl border border-white/20 p-6 transform transition-all duration-300 ${
                    isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
                }`}>
                    <div className="space-y-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`block p-4 rounded-xl transition-all duration-200 ${
                                    pathname === item.href
                                        ? 'bg-emerald-600 text-white'
                                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="font-semibold text-lg">{item.label}</span>
                                </div>
                                <p className="text-sm opacity-80 ml-8">{item.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Spacer for fixed navigation */}
            <div className="h-16" />
        </>
    );
}