export interface CarbonAnalysisResult {
    url: string;
    score: number;
    totalSize: number; // en MB
    requests: number;
    co2PerVisit: number; // en grammes - VALEUR PRINCIPALE
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

export interface PageSpeedInsightsResponse {
    lighthouseResult: {
        categories: {
            performance: {
                score: number;
            };
        };
        audits: {
            [key: string]: {
                numericValue?: number;
                details?: {
                    items?: any[];
                };
            };
        };
    };
}

export interface GreenWebFoundationResponse {
    green: boolean;
    url: string;
    hostedby?: string;
    hostedbywebsite?: string;
    partner?: string;
}