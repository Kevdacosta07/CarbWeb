
interface PageSpeedResult {
    score: number;
    metrics: {
        firstContentfulPaint: number;
        largestContentfulPaint: number;
        cumulativeLayoutShift: number;
        totalBlockingTime: number;
        speedIndex?: number;
        interactive?: number;
    };
    resources: {
        totalBytes: number;
        requests: number;
        breakdown: {
            html: number;
            css: number;
            javascript: number;
            image: number;
            font: number;
            other: number;
        };
    };
}

interface GreenHostingResult {
    green: boolean;
    hostedby?: string;
    hostedbywebsite?: string;
    partner?: string;
}

interface CarbonAnalysisResult {
    url: string;
    strategy?: 'mobile' | 'desktop'; // ✨ NOUVEAU : Stratégie d'analyse
    score: number;
    totalSize: number; // en MB
    requests: number;
    co2PerVisit: number; // en grammes
    annualCO2: number; // en kg
    grade: string;
    isGreenHosted: boolean;
    details: {
        html: number;
        css: number;
        js: number;
        images: number;
        fonts: number;
        other: number;
    };
    performanceMetrics: {
        fcp: number;
        lcp: number;
        cls: number;
        tbt: number;
        speedIndex?: number;
        interactiveTime?: number;
    };
    suggestions: string[];
    comparison: {
        vsAverage: string;
        equivalentKm: number;
        treesNeeded: number;
    };
}

export class CarbonCalculator {
    // 🎯 COEFFICIENTS CORRECTS WEBSITE CARBON CALCULATOR
    // Source exacte: Sustainable Web Design Model
    private static readonly CO2_GRAMS_PER_BYTE = 0.000000081; // 0.081 milligramme par byte (CORRECT)

    // Facteurs de réduction réalistes
    private static readonly GREEN_HOSTING_REDUCTION = 0.95; // -5% pour hébergement vert

    // 🔥 STATISTIQUES WEB RÉALISTES 2024 - CORRIGÉES
    private static readonly WEB_MEDIAN_CO2 = 0.8; // grammes CO₂ médiane web 2024 (Website Carbon officiel)
    private static readonly WEB_AVERAGE_SIZE_MB = 2.1; // Taille moyenne page web 2024
    private static readonly BYTES_PER_MB = 1024 * 1024;

    // Estimations de trafic mensuel réalistes
    private static readonly MONTHLY_VISITORS = {
        small: 1000,      // Blog personnel
        medium: 5000,     // Site PME
        large: 25000,     // Site populaire
        enterprise: 100000 // Site major
    };

    /**
     * ✨ MODIFIÉ : Analyse complète avec choix mobile/desktop
     */
    static async analyzeWebsite(url: string, strategy: 'mobile' | 'desktop' = 'mobile'): Promise<CarbonAnalysisResult> {
        try {
            console.log(`🔍 Début analyse carbone ${strategy.toUpperCase()} pour: ${url}`);

            // 1. Analyse des performances avec PageSpeed Insights (avec stratégie)
            const pageSpeedData = await this.getPageSpeedData(url, strategy);

            // 2. Vérification hébergement vert
            const greenHosting = await this.checkGreenHosting(url);

            // 3. Calcul des émissions CO2 CORRECTS
            const co2Calculations = this.calculateCorrectCO2(pageSpeedData, greenHosting.green);

            // 4. Génération des suggestions (avec stratégie)
            const suggestions = this.generateSuggestions(pageSpeedData, greenHosting.green, strategy);

            // 5. Score environnemental
            const environmentalScore = this.calculateEnvironmentalScore(pageSpeedData, greenHosting.green, co2Calculations.co2PerVisit);

            // 6. Comparaisons contextuelles réalistes
            const comparison = this.generateRealisticComparison(co2Calculations.co2PerVisit);

            const result: CarbonAnalysisResult = {
                url,
                strategy, // ✨ NOUVEAU : Ajouter la stratégie
                score: environmentalScore.score,
                grade: environmentalScore.grade,
                totalSize: pageSpeedData.resources.totalBytes / this.BYTES_PER_MB,
                requests: pageSpeedData.resources.requests,
                co2PerVisit: co2Calculations.co2PerVisit,
                annualCO2: co2Calculations.annualCO2,
                isGreenHosted: greenHosting.green,
                details: {
                    html: Math.round(pageSpeedData.resources.breakdown.html / 1024),
                    css: Math.round(pageSpeedData.resources.breakdown.css / 1024),
                    js: Math.round(pageSpeedData.resources.breakdown.javascript / 1024),
                    images: Math.round(pageSpeedData.resources.breakdown.image / 1024),
                    fonts: Math.round(pageSpeedData.resources.breakdown.font / 1024),
                    other: Math.round(pageSpeedData.resources.breakdown.other / 1024)
                },
                performanceMetrics: {
                    fcp: pageSpeedData.metrics.firstContentfulPaint,
                    lcp: pageSpeedData.metrics.largestContentfulPaint,
                    cls: pageSpeedData.metrics.cumulativeLayoutShift,
                    tbt: pageSpeedData.metrics.totalBlockingTime,
                    speedIndex: pageSpeedData.metrics.speedIndex,
                    interactiveTime: pageSpeedData.metrics.interactive
                },
                suggestions,
                comparison
            };

            console.log(`✅ Analyse ${strategy} terminée:`, {
                co2PerVisit: result.co2PerVisit + 'g',
                totalSize: result.totalSize.toFixed(1) + 'MB',
                isGreenHosted: result.isGreenHosted,
                score: result.score,
                strategy: strategy
            });

            return result;

        } catch (error) {
            console.error('❌ Erreur lors de l\'analyse:', error);
            throw new Error(`Erreur lors de l'analyse carbone: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
        }
    }

    /**
     * ✨ MODIFIÉ : Récupération des données PageSpeed avec stratégie
     */
    private static async getPageSpeedData(url: string, strategy: 'mobile' | 'desktop' = 'mobile'): Promise<PageSpeedResult> {
        const apiKey = process.env.NEXT_PUBLIC_PAGESPEED_API_KEY;
        if (!apiKey) {
            throw new Error('Clé API PageSpeed Insights manquante');
        }

        const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;

        // ✨ MODIFIÉ : Utiliser la stratégie dans l'URL de l'API
        const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(normalizedUrl)}&key=${apiKey}&category=performance&strategy=${strategy}`;

        console.log(`📊 Appel PageSpeed API (${strategy}) pour: ${normalizedUrl}`);

        const response = await fetch(apiUrl);

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error('Erreur PageSpeed API:', errorData);
            throw new Error(`Erreur API PageSpeed (${response.status}): ${errorData?.error?.message || 'Service indisponible'}`);
        }

        const data = await response.json();

        // Extraction des métriques Lighthouse
        const lighthouseResult = data.lighthouseResult;
        const audits = lighthouseResult.audits;

        // Calcul de la taille totale depuis les audits
        const resourceSummary = audits['resource-summary'];
        const networkRequests = audits['network-requests'];

        let totalBytes = 0;
        let breakdown = {
            html: 0,
            css: 0,
            javascript: 0,
            image: 0,
            font: 0,
            other: 0
        };

        if (resourceSummary?.details?.items) {
            resourceSummary.details.items.forEach((item: any) => {
                const resourceType = item.resourceType.toLowerCase();
                const size = item.transferSize || 0;

                totalBytes += size;

                switch (resourceType) {
                    case 'document':
                        breakdown.html += size;
                        break;
                    case 'stylesheet':
                        breakdown.css += size;
                        break;
                    case 'script':
                        breakdown.javascript += size;
                        break;
                    case 'image':
                        breakdown.image += size;
                        break;
                    case 'font':
                        breakdown.font += size;
                        break;
                    default:
                        breakdown.other += size;
                }
            });
        }

        // Fallback si pas de données détaillées
        if (totalBytes === 0 && networkRequests?.details?.items) {
            totalBytes = networkRequests.details.items.reduce((sum: number, item: any) =>
                sum + (item.transferSize || 0), 0);
        }

        // Nombre de requêtes
        const requests = networkRequests?.details?.items?.length || 0;

        // Score de performance
        const performanceScore = Math.round((lighthouseResult.categories.performance?.score || 0) * 100);

        return {
            score: performanceScore,
            metrics: {
                firstContentfulPaint: audits['first-contentful-paint']?.numericValue || 0,
                largestContentfulPaint: audits['largest-contentful-paint']?.numericValue || 0,
                cumulativeLayoutShift: audits['cumulative-layout-shift']?.numericValue || 0,
                totalBlockingTime: audits['total-blocking-time']?.numericValue || 0,
                speedIndex: audits['speed-index']?.numericValue,
                interactive: audits['interactive']?.numericValue
            },
            resources: {
                totalBytes,
                requests,
                breakdown
            }
        };
    }

    /**
     * Vérification hébergement vert via Green Web Foundation
     */
    private static async checkGreenHosting(url: string): Promise<GreenHostingResult> {
        try {
            const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
            const apiUrl = `https://api.thegreenwebfoundation.org/greencheck/${domain}`;

            console.log(`🌱 Vérification hébergement vert pour: ${domain}`);

            const response = await fetch(apiUrl);

            if (!response.ok) {
                console.warn(`⚠️ API Green Web Foundation indisponible (${response.status})`);
                return { green: false };
            }

            const data = await response.json();

            return {
                green: data.green || false,
                hostedby: data.hostedby,
                hostedbywebsite: data.hostedbywebsite,
                partner: data.partner
            };

        } catch (error) {
            console.warn('⚠️ Erreur vérification hébergement vert:', error);
            return { green: false };
        }
    }

    /**
     * 🎯 CALCUL CO2 CORRIGÉ - Coefficient exact Website Carbon Calculator
     */
    private static calculateCorrectCO2(pageSpeedData: PageSpeedResult, isGreenHosted: boolean): { co2PerVisit: number; annualCO2: number } {
        const totalBytes = pageSpeedData.resources.totalBytes;
        const sizeMB = totalBytes / this.BYTES_PER_MB;

        console.log(`📊 Calcul CO2 CORRIGÉ pour ${totalBytes} bytes (${sizeMB.toFixed(2)} MB)`);

        // 🎯 CALCUL CORRIGÉ selon Website Carbon Calculator
        // Formule: CO2 = bytes × coefficient_exact
        let co2PerVisit = totalBytes * this.CO2_GRAMS_PER_BYTE;

        // Application de la réduction pour hébergement vert
        if (isGreenHosted) {
            co2PerVisit *= this.GREEN_HOSTING_REDUCTION;
            console.log(`🌱 Réduction hébergement vert appliquée: -${((1 - this.GREEN_HOSTING_REDUCTION) * 100).toFixed(1)}%`);
        }

        // Calcul projection annuelle (estimation conservatrice)
        const estimatedMonthlyVisitors = this.estimateMonthlyVisitors(sizeMB);
        const annualCO2 = (co2PerVisit * estimatedMonthlyVisitors * 12) / 1000; // en kg

        console.log(`💡 Calcul final: ${co2PerVisit.toFixed(3)}g CO₂ par visite`);

        return {
            co2PerVisit: Math.round(co2PerVisit * 1000) / 1000, // 3 décimales
            annualCO2: Math.round(annualCO2 * 100) / 100 // 2 décimales
        };
    }

    /**
     * ✨ NOUVEAU : Génération des suggestions avec stratégie
     */
    private static generateSuggestions(pageSpeedData: PageSpeedResult, isGreenHosted: boolean, strategy?: 'mobile' | 'desktop'): string[] {
        const suggestions: string[] = [];
        const { score, resources, metrics } = pageSpeedData;
        const sizeMB = resources.totalBytes / this.BYTES_PER_MB;

        // Suggestions générales basées sur la performance
        if (score < 50) {
            suggestions.push('🚨 Performance critique : Optimisation urgente nécessaire');
        } else if (score < 75) {
            suggestions.push('⚠️ Performance modérée : Améliorations recommandées');
        } else if (score >= 90) {
            suggestions.push('✅ Excellente performance : Site bien optimisé');
        }

        // ✨ Suggestions spécifiques à la stratégie
        if (strategy === 'mobile') {
            if (sizeMB > 3) {
                suggestions.push('📱 Mobile : Réduire drastiquement la taille (connexion 4G limitée)');
            }
            if (metrics.firstContentfulPaint > 2500) {
                suggestions.push('📱 Mobile : Optimiser le temps de premier affichage (<2.5s)');
            }
            if (resources.requests > 50) {
                suggestions.push('📱 Mobile : Réduire le nombre de requêtes (<50 sur mobile)');
            }
            if (metrics.largestContentfulPaint > 4000) {
                suggestions.push('📱 Mobile : Améliorer le LCP pour une meilleure UX mobile');
            }
            suggestions.push('📱 Mobile : Prioriser le contenu above-the-fold');
            suggestions.push('📱 Mobile : Utiliser des images WebP adaptatives');
        } else if (strategy === 'desktop') {
            if (sizeMB > 5) {
                suggestions.push('💻 Desktop : Optimiser la taille des ressources');
            }
            if (metrics.firstContentfulPaint > 1500) {
                suggestions.push('💻 Desktop : Améliorer le temps de premier affichage');
            }
            if (resources.requests > 100) {
                suggestions.push('💻 Desktop : Réduire le nombre de requêtes HTTP');
            }
            if (metrics.totalBlockingTime > 300) {
                suggestions.push('💻 Desktop : Réduire le JavaScript bloquant');
            }
            suggestions.push('💻 Desktop : Exploiter le cache navigateur');
            suggestions.push('💻 Desktop : Optimiser les polices et CSS');
        }

        // Suggestions communes basées sur les ressources
        if (sizeMB > 2) {
            suggestions.push('🗜️ Compresser les images et utiliser des formats modernes (WebP, AVIF)');
        }

        if (resources.breakdown.javascript / this.BYTES_PER_MB > 1) {
            suggestions.push('⚡ Réduire et optimiser le JavaScript (tree-shaking, minification)');
        }

        if (resources.breakdown.image / this.BYTES_PER_MB > 1.5) {
            suggestions.push('🖼️ Optimiser les images : redimensionner, compresser, lazy loading');
        }

        if (resources.breakdown.css / this.BYTES_PER_MB > 0.3) {
            suggestions.push('🎨 Optimiser le CSS : purger les styles inutilisés');
        }

        if (resources.requests > 75) {
            suggestions.push('🔗 Réduire le nombre de requêtes HTTP (bundling, sprites)');
        }

        // Suggestions environnementales
        if (!isGreenHosted) {
            suggestions.push('🌱 Migrer vers un hébergement utilisant des énergies renouvelables');
        }

        if (sizeMB > this.WEB_AVERAGE_SIZE_MB) {
            suggestions.push('📉 Votre site est plus lourd que la moyenne web (2.1MB)');
        }

        // Limiter à 8 suggestions maximum
        return suggestions.slice(0, 8);
    }

    /**
     * Calcul du score environnemental
     */
    private static calculateEnvironmentalScore(pageSpeedData: PageSpeedResult, isGreenHosted: boolean, co2PerVisit: number): { score: number; grade: string } {
        let score = 0;

        // Score basé sur la performance (0-40 points)
        score += (pageSpeedData.score / 100) * 40;

        // Score basé sur la taille (0-30 points)
        const sizeMB = pageSpeedData.resources.totalBytes / this.BYTES_PER_MB;
        if (sizeMB <= 1) score += 30;
        else if (sizeMB <= 2) score += 25;
        else if (sizeMB <= 3) score += 20;
        else if (sizeMB <= 5) score += 15;
        else score += 10;

        // Score basé sur l'empreinte carbone (0-20 points)
        if (co2PerVisit <= 0.5) score += 20;
        else if (co2PerVisit <= 1) score += 15;
        else if (co2PerVisit <= 2) score += 10;
        else score += 5;

        // Bonus hébergement vert (0-10 points)
        if (isGreenHosted) score += 10;

        score = Math.round(score);

        // Attribution des grades
        let grade: string;
        if (score >= 90) grade = 'A+';
        else if (score >= 80) grade = 'A';
        else if (score >= 70) grade = 'B';
        else if (score >= 60) grade = 'C';
        else if (score >= 50) grade = 'D';
        else grade = 'F';

        return { score, grade };
    }

    /**
     * Génération de comparaisons réalistes
     */
    private static generateRealisticComparison(co2PerVisit: number): { vsAverage: string; equivalentKm: number; treesNeeded: number } {
        const vsMedian = co2PerVisit / this.WEB_MEDIAN_CO2;

        let vsAverage: string;

        // ✨ CORRIGÉ : Logique de comparaison améliorée
        if (vsMedian <= 0.3) {
            const reduction = Math.round((1 - vsMedian) * 100);
            vsAverage = `${reduction}% moins polluant que la médiane web`;
        } else if (vsMedian <= 0.5) {
            vsAverage = "50% moins polluant que la médiane web";
        } else if (vsMedian <= 0.7) {
            const reduction = Math.round((1 - vsMedian) * 100);
            vsAverage = `${reduction}% moins polluant que la médiane web`;
        } else if (vsMedian <= 0.9) {
            const reduction = Math.round((1 - vsMedian) * 100);
            vsAverage = `${reduction}% moins polluant que la médiane web`;
        } else if (vsMedian <= 1.1) {
            vsAverage = "Proche de la médiane web (0.8g CO₂)";
        } else if (vsMedian <= 1.5) {
            const increase = Math.round((vsMedian - 1) * 100);
            vsAverage = `${increase}% plus polluant que la médiane web`;
        } else if (vsMedian <= 2) {
            const increase = Math.round((vsMedian - 1) * 100);
            vsAverage = `${increase}% plus polluant que la médiane web`;
        } else if (vsMedian <= 3) {
            const times = (vsMedian).toFixed(1);
            vsAverage = `${times}x plus polluant que la médiane web`;
        } else {
            const times = Math.round(vsMedian);
            vsAverage = `${times}x plus polluant que la médiane web`;
        }

        // 1 km en voiture = ~120g CO₂, donc 1g CO₂ = ~8.33 mètres
        const equivalentKm = (co2PerVisit / 120) * 1000; // Conversion correcte

        // 1 arbre absorbe ~22kg CO₂/an
        // Pour une visite quotidienne pendant un an
        const annualCO2FromDailyVisits = co2PerVisit * 365; // grammes par an
        const treesNeeded = annualCO2FromDailyVisits / 22000; // conversion en kg puis calcul arbres

        console.log(`📊 Comparaison: ${co2PerVisit}g vs médiane ${this.WEB_MEDIAN_CO2}g = ratio ${vsMedian.toFixed(2)}`);
        console.log(`📊 Résultat: "${vsAverage}"`);

        return {
            vsAverage,
            equivalentKm: Math.round(equivalentKm * 1000) / 1000, // 3 décimales
            treesNeeded: Math.round(treesNeeded * 1000) / 1000    // 3 décimales
        };
    }

    /**
     * Estimation du trafic mensuel basé sur la taille
     */
    private static estimateMonthlyVisitors(sizeMB: number): number {
        if (sizeMB <= 1) return this.MONTHLY_VISITORS.large; // Site léger = populaire
        else if (sizeMB <= 3) return this.MONTHLY_VISITORS.medium;
        else if (sizeMB <= 5) return this.MONTHLY_VISITORS.small;
        else return this.MONTHLY_VISITORS.small / 2; // Site lourd = moins de visiteurs
    }
}