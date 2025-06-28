'use client';

import { useState } from 'react';
import { TechnicalLink } from './TechnicalLink';

interface CarbonResultsProps {
    data: {
        url: string;
        strategy?: 'mobile' | 'desktop';
        score: number;
        totalSize: number;
        requests: number;
        co2PerVisit: number;
        annualCO2?: number;
        grade: string;
        details: {
            html: number;
            css: number;
            js: number;
            images: number;
            fonts: number;
            other: number;
        };
        suggestions: string[];
        isGreenHosted?: boolean;
        performanceMetrics?: {
            fcp: number;
            lcp: number;
            cls: number;
            tbt: number;
            speedIndex?: number;
            interactiveTime?: number;
        };
        comparison?: {
            vsAverage: string;
            equivalentKm: number;
            treesNeeded: number;
        };
    };
    onReset: () => void;
}

export function CarbonResults({ data, onReset }: CarbonResultsProps) {
    const [monthlyVisitors, setMonthlyVisitors] = useState(5000);

    // 🚀 ÉQUIVALENCES RÉVOLUTIONNAIRES ET IMPACTANTES
    const calculatePowerfulEquivalences = () => {
        const co2PerVisit = data.co2PerVisit;

        // Impact annuel basé sur les visiteurs estimés
        const annualCO2Kg = (co2PerVisit * monthlyVisitors * 12) / 1000;

        // 🔥 ÉQUIVALENCES PUISSANTES ET PARLANTES
        const equivalences = {
            // 💡 Ampoule LED allumée 10h = 80g CO₂ (8W × 10h × 0.001 kg CO₂/Wh)
            ledHours: (co2PerVisit / 8) * 100, // Heures d'éclairage LED

            // 🔥 Chauffage maison 1h = 2kg CO₂ (2000W × 1h × 0.001)
            heatingMinutes: (co2PerVisit / 2000) * 60 * 1000, // Minutes de chauffage

            // ✈️ Vol Paris-Londres = 220kg CO₂ par passager
            flightDistance: (co2PerVisit / 220000) * 344, // km de vol équivalent

            // 🏭 Production d'1 T-shirt coton = 2.5kg CO₂
            tshirts: co2PerVisit / 2500, // Fraction de T-shirt

            // 🥩 Production 100g bœuf = 6kg CO₂
            beefGrams: (co2PerVisit / 60) * 1000, // Grammes de bœuf

            // 🚗 Voiture électrique vs essence (120g/km vs 180g/km)
            electricCarKm: (co2PerVisit / 120) * 1000, // mètres en voiture électrique
            gasCarKm: (co2PerVisit / 180) * 1000, // mètres en voiture essence

            // 📱 Production d'un smartphone = 85kg CO₂
            smartphone: co2PerVisit / 85000, // Fraction de smartphone

            // 🌳 1 arbre mature absorbe 22kg CO₂/an
            treesDays: (co2PerVisit / 22000) * 365, // Jours d'absorption d'un arbre

            // 🍔 1 hamburger = 2.5kg CO₂
            burgers: co2PerVisit / 2500, // Fraction de hamburger

            // ⚡ Recharge complète voiture électrique = 15kg CO₂ (75kWh)
            evChargePercent: (co2PerVisit / 15000) * 100, // % de charge voiture électrique

            // 🏠 Consommation électrique maison française 1 jour = 30kg CO₂
            houseDailyElectricity: (co2PerVisit / 30000) * 24 * 60, // Minutes d'électricité maison

            // 📺 TV LED 55" allumée 1h = 150g CO₂
            tvHours: (co2PerVisit / 150) * 60, // Minutes de TV

            // 🧻 1 rouleau papier toilette = 1.5kg CO₂
            toiletPaper: co2PerVisit / 1500, // Fraction de rouleau

            // 🚲 vs 🚗 : 1km à vélo = 0g, 1km en voiture = 180g
            carVsBikeKm: co2PerVisit / 180 * 1000 // mètres économisés en prenant le vélo
        };

        // Comparaison vs médiane web (0.8g selon Website Carbon)
        const vsMedian = co2PerVisit / 0.8;

        return { annualCO2Kg, equivalences, vsMedian };
    };

    const { annualCO2Kg, equivalences, vsMedian } = calculatePowerfulEquivalences();

    const getGradeColor = (grade: string) => {
        switch (grade) {
            case 'A+':
            case 'A': return { bg: 'from-emerald-400 to-green-500', text: 'text-white', label: 'Excellent' };
            case 'B+':
            case 'B': return { bg: 'from-lime-400 to-green-500', text: 'text-white', label: 'Bon' };
            case 'C+':
            case 'C': return { bg: 'from-yellow-400 to-orange-500', text: 'text-white', label: 'Moyen' };
            case 'D': return { bg: 'from-orange-500 to-red-500', text: 'text-white', label: 'Préoccupant' };
            case 'F': return { bg: 'from-red-500 to-red-700', text: 'text-white', label: 'Critique' };
            default: return { bg: 'from-slate-400 to-slate-600', text: 'text-white', label: 'Inconnu' };
        }
    };

    const gradeInfo = getGradeColor(data.grade);

    const formatCO2 = (grams: number) => {
        if (grams >= 1) {
            return `${grams.toFixed(2)}g`;
        }
        return `${(grams * 1000).toFixed(0)}mg`;
    };

    const formatFileSize = (sizeInMB: number) => {
        if (sizeInMB >= 1) {
            return `${sizeInMB.toFixed(1)} MB`;
        }
        return `${(sizeInMB * 1024).toFixed(0)} KB`;
    };

    const getUrlDomain = (url: string) => {
        try {
            return new URL(url).hostname;
        } catch {
            return url;
        }
    };

    const handleVisitSite = () => {
        window.open(data.url, '_blank', 'noopener,noreferrer');
    };

    // Fonction de mise à jour des visiteurs
    const handleVisitorsChange = (value: number) => {
        const clampedValue = Math.min(100000, Math.max(100, value));
        setMonthlyVisitors(clampedValue);
    };

    // Fonction pour gérer l'input texte
    const handleTextInputChange = (value: string) => {
        const numericValue = parseInt(value.replace(/\D/g, '')) || 100;
        handleVisitorsChange(numericValue);
    };

    const getStrategyDisplay = () => {
        if (!data.strategy) return null;

        return data.strategy === 'mobile' ? {
            icon: '📱',
            text: 'Mobile',
            color: 'text-emerald-400',
            bgColor: 'bg-emerald-900/40',
            borderColor: 'border-emerald-500/50',
            description: 'Connexion 4G, écran tactile'
        } : {
            icon: '💻',
            text: 'Desktop',
            color: 'text-blue-400',
            bgColor: 'bg-blue-900/40',
            borderColor: 'border-blue-500/50',
            description: 'Connexion filaire, grand écran'
        };
    };

    const strategyInfo = getStrategyDisplay();

    // 🎯 SÉLECTION INTELLIGENTE DES MEILLEURES ÉQUIVALENCES
    const getBestEquivalences = () => {
        const eq = equivalences;
        const results = [];

        // 🔥 Équivalences alimentaires (très parlantes)
        if (eq.beefGrams >= 0.1) {
            results.push({
                icon: '🥩',
                value: eq.beefGrams >= 1 ? `${eq.beefGrams.toFixed(1)}g` : `${(eq.beefGrams * 1000).toFixed(0)}mg`,
                label: 'de bœuf produit',
                color: 'from-red-900/40 to-red-800/40',
                border: 'border-red-500/30',
                textColor: 'text-red-400'
            });
        }

        if (eq.burgers >= 0.01) {
            results.push({
                icon: '🍔',
                value: eq.burgers >= 0.1 ? `${(eq.burgers * 100).toFixed(0)}%` : `${(eq.burgers * 1000).toFixed(1)}‰`,
                label: "d'un hamburger",
                color: 'from-orange-900/40 to-orange-800/40',
                border: 'border-orange-500/30',
                textColor: 'text-orange-400'
            });
        }

        // 🚗 Transport (très impactant)
        if (eq.gasCarKm >= 1) {
            results.push({
                icon: '🚗',
                value: eq.gasCarKm >= 1000 ? `${(eq.gasCarKm/1000).toFixed(1)} km` : `${Math.round(eq.gasCarKm)} m`,
                label: 'en voiture essence',
                color: 'from-gray-900/40 to-gray-800/40',
                border: 'border-gray-500/30',
                textColor: 'text-gray-400'
            });
        } else if (eq.electricCarKm >= 1) {
            results.push({
                icon: '⚡',
                value: eq.electricCarKm >= 1000 ? `${(eq.electricCarKm/1000).toFixed(1)} km` : `${Math.round(eq.electricCarKm)} m`,
                label: 'en voiture électrique',
                color: 'from-green-900/40 to-green-800/40',
                border: 'border-green-500/30',
                textColor: 'text-green-400'
            });
        }

        // 🏠 Énergie domestique (très relatable)
        if (eq.houseDailyElectricity >= 1) {
            results.push({
                icon: '🏠',
                value: eq.houseDailyElectricity >= 60 ? `${(eq.houseDailyElectricity/60).toFixed(1)}h` : `${Math.round(eq.houseDailyElectricity)}min`,
                label: "d'électricité maison",
                color: 'from-blue-900/40 to-blue-800/40',
                border: 'border-blue-500/30',
                textColor: 'text-blue-400'
            });
        }

        if (eq.tvHours >= 1) {
            results.push({
                icon: '📺',
                value: eq.tvHours >= 60 ? `${(eq.tvHours/60).toFixed(1)}h` : `${Math.round(eq.tvHours)}min`,
                label: 'de télévision',
                color: 'from-purple-900/40 to-purple-800/40',
                border: 'border-purple-500/30',
                textColor: 'text-purple-400'
            });
        }

        // 🌱 Nature (positif)
        if (eq.treesDays >= 0.1) {
            results.push({
                icon: '🌳',
                value: eq.treesDays >= 1 ? `${eq.treesDays.toFixed(1)} jours` : `${(eq.treesDays * 24).toFixed(1)}h`,
                label: "d'absorption d'un arbre",
                color: 'from-emerald-900/40 to-emerald-800/40',
                border: 'border-emerald-500/30',
                textColor: 'text-emerald-400'
            });
        }

        // ✈️ Vol (très impactant si pertinent)
        if (eq.flightDistance >= 0.1) {
            results.push({
                icon: '✈️',
                value: eq.flightDistance >= 1 ? `${eq.flightDistance.toFixed(1)} km` : `${(eq.flightDistance * 1000).toFixed(0)}m`,
                label: 'de vol en avion',
                color: 'from-sky-900/40 to-sky-800/40',
                border: 'border-sky-500/30',
                textColor: 'text-sky-400'
            });
        }

        // 📱 Tech (relatable)
        if (eq.smartphone >= 0.00001) {
            const percentage = eq.smartphone * 100;
            results.push({
                icon: '📱',
                value: percentage >= 0.01 ? `${percentage.toFixed(2)}%` : `${(percentage * 1000).toFixed(1)}‰`,
                label: "d'un smartphone",
                color: 'from-indigo-900/40 to-indigo-800/40',
                border: 'border-indigo-500/30',
                textColor: 'text-indigo-400'
            });
        }

        // 🔋 Recharge EV
        if (eq.evChargePercent >= 0.01) {
            results.push({
                icon: '🔋',
                value: `${eq.evChargePercent.toFixed(2)}%`,
                label: 'charge voiture électrique',
                color: 'from-lime-900/40 to-lime-800/40',
                border: 'border-lime-500/30',
                textColor: 'text-lime-400'
            });
        }

        // Retourner les 4 plus pertinentes
        return results.slice(0, 4);
    };

    const bestEquivalences = getBestEquivalences();

    // 🎨 FONCTIONS POUR LES ANALYSES DÉTAILLÉES

    // Calcul des pourcentages pour la composition
    const calculateResourcesBreakdown = () => {
        const totalKB = Object.values(data.details).reduce((sum, value) => sum + value, 0);

        return [
            {
                type: 'Images',
                value: data.details.images,
                percentage: totalKB > 0 ? (data.details.images / totalKB) * 100 : 0,
                color: 'bg-blue-500',
                icon: '🖼️',
                impact: 'Très élevé',
                description: 'Principal contributeur au poids et émissions'
            },
            {
                type: 'JavaScript',
                value: data.details.js,
                percentage: totalKB > 0 ? (data.details.js / totalKB) * 100 : 0,
                color: 'bg-yellow-500',
                icon: '⚡',
                impact: 'Élevé',
                description: 'Impact CPU et batterie'
            },
            {
                type: 'CSS',
                value: data.details.css,
                percentage: totalKB > 0 ? (data.details.css / totalKB) * 100 : 0,
                color: 'bg-purple-500',
                icon: '🎨',
                impact: 'Modéré',
                description: 'Stylage et mise en forme'
            },
            {
                type: 'HTML',
                value: data.details.html,
                percentage: totalKB > 0 ? (data.details.html / totalKB) * 100 : 0,
                color: 'bg-green-500',
                icon: '📄',
                impact: 'Faible',
                description: 'Structure de base'
            },
            {
                type: 'Polices',
                value: data.details.fonts,
                percentage: totalKB > 0 ? (data.details.fonts / totalKB) * 100 : 0,
                color: 'bg-orange-500',
                icon: '🔤',
                impact: 'Modéré',
                description: 'Typographie personnalisée'
            },
            {
                type: 'Autres',
                value: data.details.other,
                percentage: totalKB > 0 ? (data.details.other / totalKB) * 100 : 0,
                color: 'bg-gray-500',
                icon: '📦',
                impact: 'Variable',
                description: 'Fichiers divers'
            }
        ].filter(item => item.value > 0).sort((a, b) => b.value - a.value);
    };

    // ✨ CORRECTION : Calcul du score performance uniquement depuis PageSpeed
    const getPerformanceScore = () => {
        // Le score global (data.score) est environnemental, pas de performance pure
        // Il faut extraire le score performance depuis les métriques ou utiliser une estimation

        // Estimation du score performance basée sur les métriques Web Vitals
        if (!data.performanceMetrics) return 0;

        const metrics = data.performanceMetrics;
        let performanceScore = 0;
        let metricsCount = 0;

        // FCP Score (0-100)
        if (metrics.fcp > 0) {
            const fcpScore = metrics.fcp <= 1800 ? 100 :
                metrics.fcp <= 3000 ? 75 :
                    metrics.fcp <= 5000 ? 50 : 25;
            performanceScore += fcpScore;
            metricsCount++;
        }

        // LCP Score (0-100)
        if (metrics.lcp > 0) {
            const lcpScore = metrics.lcp <= 2500 ? 100 :
                metrics.lcp <= 4000 ? 75 :
                    metrics.lcp <= 6000 ? 50 : 25;
            performanceScore += lcpScore;
            metricsCount++;
        }

        // TBT Score (0-100)
        if (metrics.tbt >= 0) {
            const tbtScore = metrics.tbt <= 200 ? 100 :
                metrics.tbt <= 600 ? 75 :
                    metrics.tbt <= 1000 ? 50 : 25;
            performanceScore += tbtScore;
            metricsCount++;
        }

        // CLS Score (0-100)
        if (metrics.cls >= 0) {
            const clsScore = metrics.cls <= 0.1 ? 100 :
                metrics.cls <= 0.25 ? 75 :
                    metrics.cls <= 0.5 ? 50 : 25;
            performanceScore += clsScore;
            metricsCount++;
        }

        return metricsCount > 0 ? Math.round(performanceScore / metricsCount) : 0;
    };

    // Analyse détaillée des performances
    const getPerformanceAnalysis = () => {
        if (!data.performanceMetrics) return [];

        const metrics = [
            {
                name: 'First Contentful Paint',
                key: 'fcp',
                value: data.performanceMetrics.fcp,
                unit: 'ms',
                icon: '🎨',
                description: 'Temps avant le premier élément visible',
                thresholds: { good: 1800, needs: 3000 },
                impact: 'Perception de rapidité',
                tips: 'Optimiser le CSS critique, réduire les polices'
            },
            {
                name: 'Largest Contentful Paint',
                key: 'lcp',
                value: data.performanceMetrics.lcp,
                unit: 'ms',
                icon: '🖼️',
                description: 'Temps avant l\'élément principal',
                thresholds: { good: 2500, needs: 4000 },
                impact: 'Expérience utilisateur principale',
                tips: 'Optimiser les images, CDN, preload des ressources'
            },
            {
                name: 'Total Blocking Time',
                key: 'tbt',
                value: data.performanceMetrics.tbt,
                unit: 'ms',
                icon: '⏸️',
                description: 'Temps où la page est bloquée',
                thresholds: { good: 200, needs: 600 },
                impact: 'Interactivité et fluidité',
                tips: 'Découper le JavaScript, defer/async, worker'
            },
            {
                name: 'Cumulative Layout Shift',
                key: 'cls',
                value: data.performanceMetrics.cls,
                unit: '',
                icon: '📐',
                description: 'Stabilité visuelle de la page',
                thresholds: { good: 0.1, needs: 0.25 },
                impact: 'Stabilité et UX',
                tips: 'Dimensions explicites, réserver l\'espace'
            }
        ];

        if (data.performanceMetrics.speedIndex) {
            metrics.push({
                name: 'Speed Index',
                key: 'speedIndex',
                value: data.performanceMetrics.speedIndex,
                unit: 'ms',
                icon: '🚀',
                description: 'Vitesse de rendu visuel',
                thresholds: { good: 3400, needs: 5800 },
                impact: 'Perception globale de vitesse',
                tips: 'Prioriser le contenu visible, lazy loading'
            });
        }

        if (data.performanceMetrics.interactiveTime) {
            metrics.push({
                name: 'Time to Interactive',
                key: 'interactiveTime',
                value: data.performanceMetrics.interactiveTime,
                unit: 'ms',
                icon: '🖱️',
                description: 'Temps avant interactivité complète',
                thresholds: { good: 3800, needs: 7300 },
                impact: 'Délai avant utilisation normale',
                tips: 'Réduire JS, prioriser le rendu, code splitting'
            });
        }

        return metrics.map(metric => ({
            ...metric,
            status: metric.value <= metric.thresholds.good ? 'excellent' :
                metric.value <= metric.thresholds.needs ? 'ameliorer' : 'critique',
            formattedValue: metric.unit === '' ? metric.value.toFixed(3) : `${Math.round(metric.value)} ${metric.unit}`
        }));
    };

    const resourcesBreakdown = calculateResourcesBreakdown();
    const performanceAnalysis = getPerformanceAnalysis();
    const performanceScore = getPerformanceScore(); // ✨ Score performance uniquement

    const getMetricStatusColor = (status: string) => {
        switch (status) {
            case 'excellent': return { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' };
            case 'ameliorer': return { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' };
            case 'critique': return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' };
            default: return { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/30' };
        }
    };

    // 🎨 NOUVEAU SYSTÈME VISUEL : DOTS INDICATORS ANIMÉS
    const getStatusDots = (status: string) => {
        const dotCount = status === 'excellent' ? 5 :
            status === 'ameliorer' ? 3 :
                status === 'critique' ? 1 : 0;

        const baseColor = status === 'excellent' ? 'bg-emerald-400' :
            status === 'ameliorer' ? 'bg-yellow-400' :
                'bg-red-400';

        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index < dotCount
                                ? `${baseColor} animate-pulse`
                                : 'bg-gray-600'
                        }`}
                        style={{
                            animationDelay: `${index * 100}ms`
                        }}
                    />
                ))}
            </div>
        );
    };

    // 🎯 SYSTÈME DE JAUGE CIRCULAIRE
    const CircularGauge = ({ value, maxValue, label, color = 'emerald' }: {
        value: number;
        maxValue: number;
        label: string;
        color?: string;
    }) => {
        const percentage = Math.min(100, (value / maxValue) * 100);
        const radius = 35;
        const circumference = 2 * Math.PI * radius;
        const strokeDasharray = circumference;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;

        const colorClasses = {
            emerald: 'stroke-emerald-400',
            yellow: 'stroke-yellow-400',
            red: 'stroke-red-400',
            blue: 'stroke-blue-400',
            purple: 'stroke-purple-400'
        };

        return (
            <div className="relative inline-flex items-center justify-center">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                    <circle
                        cx="40"
                        cy="40"
                        r={radius}
                        stroke="rgb(55, 65, 81)"
                        strokeWidth="6"
                        fill="transparent"
                    />
                    <circle
                        cx="40"
                        cy="40"
                        r={radius}
                        className={colorClasses[color as keyof typeof colorClasses]}
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{
                            transition: 'stroke-dashoffset 2s ease-in-out',
                        }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-white">
                        {Math.round(percentage)}%
                    </span>
                    <span className="text-xs text-gray-400">{label}</span>
                </div>
            </div>
        );
    };

    // 📊 SYSTÈME DE CARTES EN GRILLES POUR RESSOURCES
    const ResourceCard = ({ resource, rank }: { resource: any; rank: number }) => {
        const getBorderIntensity = (percentage: number) => {
            if (percentage > 50) return 'border-red-500/50 shadow-red-500/20';
            if (percentage > 25) return 'border-yellow-500/50 shadow-yellow-500/20';
            if (percentage > 10) return 'border-blue-500/50 shadow-blue-500/20';
            return 'border-gray-500/50 shadow-gray-500/20';
        };

        const getImpactBadge = (impact: string) => {
            const styles = {
                'Très élevé': 'bg-red-900/60 text-red-300 border-red-500/50',
                'Élevé': 'bg-orange-900/60 text-orange-300 border-orange-500/50',
                'Modéré': 'bg-yellow-900/60 text-yellow-300 border-yellow-500/50',
                'Faible': 'bg-green-900/60 text-green-300 border-green-500/50',
                'Variable': 'bg-gray-900/60 text-gray-300 border-gray-500/50'
            };

            return styles[impact as keyof typeof styles] || styles.Variable;
        };

        return (
            <div className={`bg-slate-800/50 rounded-xl p-4 border-2 ${getBorderIntensity(resource.percentage)} shadow-lg transform hover:scale-105 transition-all duration-300`}>
                {/* Header avec rang */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${
                            rank === 1 ? 'from-yellow-400 to-yellow-600' :
                                rank === 2 ? 'from-gray-300 to-gray-500' :
                                    rank === 3 ? 'from-orange-400 to-orange-600' :
                                        'from-slate-400 to-slate-600'
                        } flex items-center justify-center text-white font-bold text-sm`}>
                            #{rank}
                        </div>
                        <div className="text-2xl">{resource.icon}</div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactBadge(resource.impact)}`}>
                        {resource.impact}
                    </div>
                </div>

                {/* Titre et description */}
                <div className="mb-3">
                    <h3 className="text-lg font-bold text-white mb-1">{resource.type}</h3>
                    <p className="text-xs text-gray-400">{resource.description}</p>
                </div>

                {/* Métriques */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <div className="text-2xl font-bold text-white">
                            {resource.value >= 1024 ? `${(resource.value/1024).toFixed(1)}` : resource.value}
                        </div>
                        <div className="text-xs text-gray-400">
                            {resource.value >= 1024 ? 'MB' : 'KB'}
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-blue-400">
                            {resource.percentage.toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-400">du total</div>
                    </div>
                </div>

                {/* CO2 Impact */}
                <div className="mt-3 pt-3 border-t border-gray-600">
                    <div className="text-xs text-gray-400 mb-1">Impact CO₂ estimé</div>
                    <div className="text-sm font-bold text-orange-400">
                        {((resource.value / 1024) * (data.co2PerVisit / data.totalSize)).toFixed(3)}g CO₂
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div id="carbon-results" className="max-w-6xl mx-auto space-y-8">
            {/* HEADER */}
            <div className="glass-light rounded-3xl p-8 border border-white/10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    {/* Info Site */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Empreinte Carbone Analysée
                        </h1>
                        <div className="text-lg font-medium text-blue-400 mb-1">
                            {getUrlDomain(data.url)}
                        </div>
                        <div className="text-sm text-gray-400 font-mono max-w-md truncate">
                            {data.url}
                        </div>

                        {strategyInfo && (
                            <div className="mt-3">
                                <div className={`inline-flex items-center gap-2 px-3 py-1 ${strategyInfo.bgColor} ${strategyInfo.color} rounded-lg text-sm border ${strategyInfo.borderColor}`}>
                                    <span>{strategyInfo.icon}</span>
                                    <span className="font-medium">{strategyInfo.text}</span>
                                    <span className="text-xs opacity-75">• {strategyInfo.description}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleVisitSite}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-200 shadow-lg flex items-center gap-2"
                        >
                            🔗 Visiter le site
                        </button>
                        <button
                            onClick={onReset}
                            className="px-6 py-3 glass-light hover:bg-white/10 text-gray-300 rounded-xl transition-colors duration-200 flex items-center gap-2 border border-white/20"
                        >
                            🔄 Nouvelle analyse
                        </button>
                    </div>
                </div>
            </div>

            {/* IMPACT PRINCIPAL */}
            <div className="glass-light rounded-3xl p-8 border border-white/10">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        🌍 Impact Environnemental Principal
                    </h2>
                    <p className="text-gray-300">
                        Analyse basée sur les données réelles de votre site web
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Score Global */}
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-600/30 text-center">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradeInfo.bg} flex items-center justify-center text-2xl font-bold ${gradeInfo.text} shadow-xl mx-auto mb-4`}>
                            {data.grade}
                        </div>
                        <div className="text-3xl font-black text-white mb-1">
                            {data.score}<span className="text-lg text-gray-400">/100</span>
                        </div>
                        <div className="text-gray-300 mb-2">Score Global</div>
                        <div className={`text-sm px-3 py-1 rounded-full ${gradeInfo.bg} ${gradeInfo.text} font-medium`}>
                            {gradeInfo.label}
                        </div>
                    </div>

                    {/* Émissions par Visite */}
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-600/30 text-center">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-2xl mx-auto mb-4">
                            ⚡
                        </div>
                        <div className="text-3xl font-black text-white mb-1">
                            {formatCO2(data.co2PerVisit)}
                        </div>
                        <div className="text-gray-300 mb-2">CO₂ par visite</div>
                        <div className="text-sm text-gray-400">
                            {vsMedian > 1 ? (
                                <span className="text-red-400">
                                    {vsMedian.toFixed(1)}× plus que la médiane web
                                </span>
                            ) : (
                                <span className="text-emerald-400">
                                    {(1/vsMedian).toFixed(1)}× moins que la médiane web
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Hébergement */}
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-600/30 text-center">
                        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 ${
                            data.isGreenHosted
                                ? 'bg-gradient-to-br from-emerald-500 to-green-600'
                                : 'bg-gradient-to-br from-orange-500 to-red-500'
                        }`}>
                            {data.isGreenHosted ? '🌿' : '⚡'}
                        </div>
                        <div className="text-lg font-bold text-white mb-1">
                            {data.isGreenHosted ? 'Hébergement Vert' : 'Hébergement Standard'}
                        </div>
                        <div className="text-gray-300 mb-2">
                            {data.isGreenHosted ? 'Énergie Renouvelable' : 'Énergie Mixte'}
                        </div>
                        <div className={`text-sm px-3 py-1 rounded-full font-medium ${
                            data.isGreenHosted
                                ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/50'
                                : 'bg-orange-900/40 text-orange-300 border border-orange-500/50'
                        }`}>
                            {data.isGreenHosted ? '−5% CO₂' : 'Impact Standard'}
                        </div>
                    </div>
                </div>
            </div>

            {/* 🚀 ÉQUIVALENCES PUISSANTES ET IMPACTANTES */}
            <div className="glass-light rounded-3xl p-8 border border-white/10">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        💥 Impact Concret de {formatCO2(data.co2PerVisit)} CO₂
                    </h2>
                    <p className="text-gray-300">
                        Équivalences tangibles pour comprendre l'impact réel par visite
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {bestEquivalences.map((equiv, index) => (
                        <div key={index} className={`bg-gradient-to-br ${equiv.color} rounded-xl p-4 text-center border ${equiv.border}`}>
                            <div className="text-2xl mb-2">{equiv.icon}</div>
                            <div className={`text-lg font-bold ${equiv.textColor}`}>
                                {equiv.value}
                            </div>
                            <div className="text-xs text-gray-300">{equiv.label}</div>
                        </div>
                    ))}
                </div>

                {/* Impact Annuel Section */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-600/30">
                    <h3 className="text-lg font-bold text-white mb-4 text-center">
                        📈 Impact Annuel Estimé
                    </h3>
                    <p className="text-center text-gray-400 mb-6 text-sm">
                        Calculez l'impact environnemental annuel selon le trafic de votre site
                    </p>

                    {/* Slider Section */}
                    <div className="mb-6">
                        <div className="text-center mb-4">
                            <div className="text-2xl font-bold text-white mb-1">
                                {monthlyVisitors.toLocaleString('fr-FR')}
                            </div>
                            <div className="text-gray-400 text-sm">visiteurs par mois</div>
                        </div>

                        {/* Slider Range */}
                        <div className="px-4">
                            <input
                                type="range"
                                min={100}
                                max={100000}
                                step={100}
                                value={monthlyVisitors}
                                onChange={(e) => handleVisitorsChange(parseInt(e.target.value))}
                                className="w-full h-3 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg appearance-none cursor-pointer slider"
                                style={{
                                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${((monthlyVisitors - 100) / (100000 - 100)) * 100}%, #374151 ${((monthlyVisitors - 100) / (100000 - 100)) * 100}%, #374151 100%)`
                                }}
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>100</span>
                                <span>10k</span>
                                <span>50k</span>
                                <span>100k</span>
                            </div>
                        </div>

                        {/* Input manuel */}
                        <div className="text-center mt-4">
                            <input
                                type="text"
                                value={monthlyVisitors.toLocaleString('fr-FR')}
                                onChange={(e) => handleTextInputChange(e.target.value)}
                                className="bg-slate-700 text-white text-center px-4 py-2 rounded-lg w-40 border border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-colors"
                                placeholder="5000"
                            />
                            <span className="text-gray-400 ml-2 text-sm">visiteurs/mois</span>
                        </div>

                        {/* Boutons rapides */}
                        <div className="flex justify-center gap-2 mt-4">
                            {[1000, 5000, 10000, 25000, 50000].map((value) => (
                                <button
                                    key={value}
                                    onClick={() => handleVisitorsChange(value)}
                                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                                        monthlyVisitors === value
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                                    }`}
                                >
                                    {value >= 1000 ? `${value/1000}k` : value}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Résultats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                            <div className="text-2xl font-bold text-red-400 mb-1">
                                {annualCO2Kg.toFixed(1)} kg
                            </div>
                            <div className="text-sm text-gray-300">CO₂ total annuel</div>
                            <div className="text-xs text-gray-500 mt-1">
                                {monthlyVisitors.toLocaleString('fr-FR')} visiteurs × 12 mois
                            </div>
                        </div>

                        <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                            <div className="text-2xl font-bold text-emerald-400 mb-1">
                                {(annualCO2Kg / 22).toFixed(1)}
                            </div>
                            <div className="text-sm text-gray-300">arbres nécessaires</div>
                            <div className="text-xs text-gray-500 mt-1">
                                pour compenser annuellement
                            </div>
                        </div>

                        <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-400 mb-1">
                                {(annualCO2Kg * 1000 / 180).toFixed(0)} km
                            </div>
                            <div className="text-sm text-gray-300">équivalent voiture</div>
                            <div className="text-xs text-gray-500 mt-1">
                                émissions annuelles
                            </div>
                        </div>
                    </div>

                    {/* Contextualisation */}
                    <div className="mt-6 text-center">
                        <div className="text-xs text-gray-400 leading-relaxed">
                            <strong>Calcul :</strong> {formatCO2(data.co2PerVisit)} CO₂/visite × {monthlyVisitors.toLocaleString('fr-FR')} visiteurs/mois × 12 mois = {annualCO2Kg.toFixed(1)} kg CO₂/an
                            <br />
                            <strong>Compensation :</strong> 1 arbre absorbe ~22kg CO₂/an • 1 km voiture = ~180g CO₂
                        </div>
                    </div>
                </div>
            </div>

            {/* 🎨 ANALYSE DÉTAILLÉE AVEC CARTES VISUELLES */}
            <div className="glass-light rounded-3xl p-8 border border-white/10">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        📦 Composition par Ressources
                    </h2>
                    <p className="text-gray-300">
                        Répartition et impact environnemental de chaque type de ressource
                    </p>
                </div>

                {/* Statistiques Globales avec Jauges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-600/30">
                        <CircularGauge
                            value={data.totalSize}
                            maxValue={5}
                            label="Taille"
                            color={data.totalSize > 2.1 ? 'red' : 'emerald'}
                        />
                        <div className="mt-2">
                            <div className="text-lg font-bold text-white">
                                {formatFileSize(data.totalSize)}
                            </div>
                            <div className="text-xs text-gray-400">
                                {data.totalSize > 2.1 ? '🔴 Au-dessus médiane' : '🟢 Optimisé'}
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-600/30">
                        <CircularGauge
                            value={data.requests}
                            maxValue={100}
                            label="Requêtes"
                            color={data.requests > 75 ? 'red' : data.requests > 50 ? 'yellow' : 'emerald'}
                        />
                        <div className="mt-2">
                            <div className="text-lg font-bold text-white">{data.requests}</div>
                            <div className="text-xs text-gray-400">Requêtes HTTP</div>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-600/30">
                        <CircularGauge
                            value={data.co2PerVisit}
                            maxValue={2}
                            label="Intensité"
                            color="purple"
                        />
                        <div className="mt-2">
                            <div className="text-lg font-bold text-white">
                                {((data.co2PerVisit / data.totalSize) * 1000).toFixed(1)}
                            </div>
                            <div className="text-xs text-gray-400">mg CO₂/MB</div>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-600/30">
                        <CircularGauge
                            value={data.score}
                            maxValue={100}
                            label="Score"
                            color={data.score >= 80 ? 'emerald' : data.score >= 60 ? 'yellow' : 'red'}
                        />
                        <div className="mt-2">
                            <div className="text-lg font-bold text-white">{data.score}/100</div>
                            <div className="text-xs text-gray-400">Score Global</div>
                        </div>
                    </div>
                </div>

                {/* Cartes des Ressources */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resourcesBreakdown.map((resource, index) => (
                        <ResourceCard key={index} resource={resource} rank={index + 1} />
                    ))}
                </div>
            </div>

            {/* ⚡ ANALYSE DES PERFORMANCES AVEC DOTS INDICATORS */}
            <div className="glass-light rounded-3xl p-8 border border-white/10">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        ⚡ Performances & Impact Énergétique
                    </h2>
                    <p className="text-gray-300">
                        Métriques Web Vitals et leur corrélation avec la consommation d'énergie
                    </p>
                </div>

                {/* Score Performance Global */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-600/30 mb-8 text-center">
                    <div className="mb-4">
                        <CircularGauge
                            value={performanceScore}
                            maxValue={100}
                            label="Performance"
                            color={performanceScore >= 90 ? 'emerald' : performanceScore >= 70 ? 'yellow' : 'red'}
                        />
                    </div>
                    <div className="text-lg font-bold text-white mb-2">Score Performance : {performanceScore}/100</div>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium ${
                        performanceScore >= 90 ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/50' :
                            performanceScore >= 70 ? 'bg-yellow-900/40 text-yellow-300 border border-yellow-500/50' :
                                'bg-red-900/40 text-red-300 border border-red-500/50'
                    }`}>
                        {performanceScore >= 90 ? '🚀 Excellent' :
                            performanceScore >= 70 ? '⚠️ Modéré' :
                                '🚨 Critique'}
                    </div>
                </div>

                {/* Métriques avec Dots Indicators */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {performanceAnalysis.map((metric, index) => {
                        const statusColors = getMetricStatusColor(metric.status);

                        return (
                            <div key={index} className={`bg-slate-800/50 rounded-xl p-6 border ${statusColors.border} shadow-lg`}>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="text-2xl">{metric.icon}</div>
                                        <div>
                                            <div className="text-lg font-bold text-white">{metric.name}</div>
                                            <div className="text-sm text-gray-400">{metric.description}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-white mb-2">
                                            {metric.formattedValue}
                                        </div>
                                        {getStatusDots(metric.status)}
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${statusColors.bg} ${statusColors.text}`}>
                                    {metric.status === 'excellent' ? '✅ Excellent' :
                                        metric.status === 'ameliorer' ? '⚠️ À améliorer' :
                                            '🚨 Critique'}
                                </div>

                                {/* Détails et Conseils */}
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <div className="text-gray-400 mb-1">💡 Optimisation recommandée</div>
                                        <div className="text-blue-400 font-medium">{metric.tips}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-400 mb-1">🔋 Impact énergétique</div>
                                        <div className="text-white">
                                            {metric.status === 'excellent' ? 'Minimal - Optimisé' :
                                                metric.status === 'ameliorer' ? 'Modéré - Améliorable' :
                                                    'Élevé - Consommation excessive'}
                                        </div>
                                    </div>
                                </div>

                                {/* Seuils de référence */}
                                <div className="mt-4 pt-3 border-t border-gray-600">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-emerald-400">≤{metric.thresholds.good}{metric.unit}</span>
                                        <span className="text-yellow-400">≤{metric.thresholds.needs}{metric.unit}</span>
                                        <span className="text-red-400">&gt;{metric.thresholds.needs}{metric.unit}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Résumé avec Badges */}
                <div className="mt-8 bg-slate-800/50 rounded-2xl p-6 border border-slate-600/30">
                    <h3 className="text-lg font-bold text-white mb-4 text-center">
                        📊 Résumé Performance
                    </h3>

                    <div className="flex justify-center gap-6">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-emerald-900/60 rounded-full flex items-center justify-center text-emerald-300 text-xl font-bold mb-2 mx-auto">
                                {performanceAnalysis.filter(m => m.status === 'excellent').length}
                            </div>
                            <div className="text-sm text-gray-300">Excellentes</div>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-yellow-900/60 rounded-full flex items-center justify-center text-yellow-300 text-xl font-bold mb-2 mx-auto">
                                {performanceAnalysis.filter(m => m.status === 'ameliorer').length}
                            </div>
                            <div className="text-sm text-gray-300">À Améliorer</div>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-red-900/60 rounded-full flex items-center justify-center text-red-300 text-xl font-bold mb-2 mx-auto">
                                {performanceAnalysis.filter(m => m.status === 'critique').length}
                            </div>
                            <div className="text-sm text-gray-300">Critiques</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SUGGESTIONS */}
            {data.suggestions && data.suggestions.length > 0 && (
                <div className="glass-light rounded-2xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        💡 Recommandations d'Optimisation
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.suggestions.slice(0, 6).map((suggestion, index) => (
                            <div key={index} className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30">
                                <div className="text-sm text-gray-300 leading-relaxed">
                                    {suggestion}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* BOUTON NOUVELLE ANALYSE */}
            <div className="text-center pt-8">
                <button
                    onClick={onReset}
                    className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/25 text-lg"
                >
                    🔄 Analyser un autre site web
                </button>
                <p className="text-gray-400 text-sm mt-3">
                    Testez d'autres sites pour comparer leur impact environnemental
                </p>
            </div>
        </div>
    );
}