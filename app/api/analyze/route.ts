import { NextRequest, NextResponse } from 'next/server';

interface AnalysisRequest {
    url: string;
    strategy?: 'mobile' | 'desktop';
}

interface CarbonAnalysisResult {
    url: string;
    timestamp: string;
    performance: {
        score: number;
        metrics: {
            firstContentfulPaint: number;
            largestContentfulPaint: number;
            totalBlockingTime: number;
            cumulativeLayoutShift: number;
            speedIndex: number;
        };
    };
    carbon: {
        totalCO2: number;
        co2PerPageView: number;
        energyConsumption: number;
        isGreenHosting: boolean;
    };
    resources: {
        totalSize: number;
        totalRequests: number;
        breakdown: {
            images: number;
            scripts: number;
            stylesheets: number;
            fonts: number;
            other: number;
        };
    };
    recommendations: string[];
}

// Configuration des constantes pour les calculs
const CO2_FACTOR_GLOBAL = 475; // g CO2/kWh (IEA 2024)
const ENERGY_PER_BYTE = 0.000006; // kWh par byte
const GREEN_HOSTING_REDUCTION = 0.5; // 50% de réduction pour l'hébergement vert

export async function POST(request: NextRequest) {
    try {
        const { url, strategy = 'mobile' }: AnalysisRequest = await request.json();

        // Validation de l'URL
        if (!url || !isValidUrl(url)) {
            return NextResponse.json(
                { error: 'URL invalide fournie' },
                { status: 400 }
            );
        }

        // Analyse parallèle des données
        const [pageSpeedData, greenHostingData] = await Promise.all([
            analyzePageSpeed(url, strategy),
            checkGreenHosting(url)
        ]);

        // Calcul de l'empreinte carbone
        const carbonData = calculateCarbonFootprint(
            pageSpeedData.resources.totalSize,
            greenHostingData.isGreen
        );

        // Construction de la réponse
        const result: CarbonAnalysisResult = {
            url,
            timestamp: new Date().toISOString(),
            performance: pageSpeedData.performance,
            carbon: {
                ...carbonData,
                isGreenHosting: greenHostingData.isGreen
            },
            resources: pageSpeedData.resources,
            recommendations: generateRecommendations(pageSpeedData)
        };

        return NextResponse.json(result);

    } catch (error) {
        console.error('Erreur lors de l\'analyse:', error);
        return NextResponse.json(
            { error: 'Erreur lors de l\'analyse du site web' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const strategy = searchParams.get('strategy') as 'mobile' | 'desktop' || 'mobile';

    if (!url) {
        return NextResponse.json(
            { error: 'Paramètre URL requis' },
            { status: 400 }
        );
    }

    // Réutilise la logique POST
    return POST(new NextRequest(request.url, {
        method: 'POST',
        body: JSON.stringify({ url, strategy })
    }));
}

// Fonctions utilitaires
function isValidUrl(string: string): boolean {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
}

async function analyzePageSpeed(url: string, strategy: string) {
    const API_KEY = process.env.GOOGLE_PAGESPEED_API_KEY;
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&key=${API_KEY}&category=performance`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`Erreur API PageSpeed: ${response.status}`);
    }

    const data = await response.json();

    return {
        performance: {
            score: Math.round((data.lighthouseResult.categories.performance.score || 0) * 100),
            metrics: {
                firstContentfulPaint: data.lighthouseResult.audits['first-contentful-paint']?.numericValue || 0,
                largestContentfulPaint: data.lighthouseResult.audits['largest-contentful-paint']?.numericValue || 0,
                totalBlockingTime: data.lighthouseResult.audits['total-blocking-time']?.numericValue || 0,
                cumulativeLayoutShift: data.lighthouseResult.audits['cumulative-layout-shift']?.numericValue || 0,
                speedIndex: data.lighthouseResult.audits['speed-index']?.numericValue || 0,
            }
        },
        resources: {
            totalSize: calculateTotalSize(data.lighthouseResult.audits),
            totalRequests: calculateTotalRequests(data.lighthouseResult.audits),
            breakdown: calculateResourceBreakdown(data.lighthouseResult.audits)
        }
    };
}

async function checkGreenHosting(url: string) {
    try {
        const domain = new URL(url).hostname;
        const response = await fetch(`https://api.thegreenwebfoundation.org/greencheck/${domain}`);
        const data = await response.json();

        return {
            isGreen: data.green || false,
            provider: data.hostedby || 'Inconnu'
        };
    } catch {
        return { isGreen: false, provider: 'Inconnu' };
    }
}

function calculateCarbonFootprint(totalSize: number, isGreenHosting: boolean) {
    const energyConsumption = totalSize * ENERGY_PER_BYTE;
    const baseCO2 = energyConsumption * CO2_FACTOR_GLOBAL;

    const totalCO2 = isGreenHosting ? baseCO2 * GREEN_HOSTING_REDUCTION : baseCO2;

    return {
        totalCO2: Math.round(totalCO2 * 100) / 100,
        co2PerPageView: Math.round(totalCO2 * 100) / 100,
        energyConsumption: Math.round(energyConsumption * 1000000) / 1000000
    };
}

function calculateTotalSize(audits: any): number {
    const networkRequests = audits['network-requests']?.details?.items || [];
    return networkRequests.reduce((total: number, request: any) => {
        return total + (request.transferSize || 0);
    }, 0);
}

function calculateTotalRequests(audits: any): number {
    const networkRequests = audits['network-requests']?.details?.items || [];
    return networkRequests.length;
}

function calculateResourceBreakdown(audits: any) {
    const networkRequests = audits['network-requests']?.details?.items || [];
    const breakdown = {
        images: 0,
        scripts: 0,
        stylesheets: 0,
        fonts: 0,
        other: 0
    };

    networkRequests.forEach((request: any) => {
        const resourceType = request.resourceType || 'other';
        const size = request.transferSize || 0;

        switch (resourceType.toLowerCase()) {
            case 'image':
                breakdown.images += size;
                break;
            case 'script':
                breakdown.scripts += size;
                break;
            case 'stylesheet':
                breakdown.stylesheets += size;
                break;
            case 'font':
                breakdown.fonts += size;
                break;
            default:
                breakdown.other += size;
        }
    });

    return breakdown;
}

function generateRecommendations(pageSpeedData: any): string[] {
    const recommendations: string[] = [];

    if (pageSpeedData.performance.score < 70) {
        recommendations.push("Optimiser les performances générales du site");
    }

    if (pageSpeedData.resources.breakdown.images > 1000000) {
        recommendations.push("Compresser et optimiser les images");
    }

    if (pageSpeedData.resources.breakdown.scripts > 500000) {
        recommendations.push("Réduire la taille des fichiers JavaScript");
    }

    if (pageSpeedData.resources.totalRequests > 100) {
        recommendations.push("Réduire le nombre de requêtes HTTP");
    }

    return recommendations;
}