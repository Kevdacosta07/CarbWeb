export class URLValidator {
    private static readonly TIMEOUT = 5000;

    static isValidUrl(url: string): boolean {
        try {
            const urlObj = new URL(url);
            return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
        } catch {
            return false;
        }
    }

    static normalizeUrl(url: string): string {
        url = url.trim();

        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }

        try {
            const urlObj = new URL(url);
            // 🔧 CORRECTION: Retourner l'URL complète au lieu de seulement l'origin
            return urlObj.href;
        } catch {
            return url;
        }
    }

    static async checkWebsiteExists(url: string): Promise<{
        exists: boolean;
        error?: string;
    }> {
        // 🔧 IMPORTANT: Utiliser l'URL complète pour la vérification
        const normalizedUrl = this.normalizeUrl(url);

        if (!this.isValidUrl(normalizedUrl)) {
            return {
                exists: false,
                error: 'URL invalide'
            };
        }

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT);

            // Vérification avec l'URL complète
            const response = await fetch(normalizedUrl, {
                method: 'HEAD',
                mode: 'no-cors',
                signal: controller.signal,
                cache: 'no-cache'
            });

            clearTimeout(timeoutId);

            // Si on arrive ici sans erreur, le site existe
            return { exists: true };

        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    return {
                        exists: false,
                        error: 'Site trop lent à répondre'
                    };
                }

                // Les erreurs de réseau indiquent que le site n'existe pas
                if (error.message.includes('Failed to fetch') ||
                    error.message.includes('NetworkError') ||
                    error.message.includes('net::ERR_NAME_NOT_RESOLVED')) {
                    return {
                        exists: false,
                        error: 'Site inexistant ou inaccessible'
                    };
                }
            }

            // Pour toute autre erreur, considérer comme inexistant
            return {
                exists: false,
                error: 'Site inaccessible'
            };
        }
    }

    // Liste simple de domaines de test à bloquer
    static isTestDomain(url: string): boolean {
        try {
            const domain = new URL(url).hostname.toLowerCase();
            const testDomains = [
                'example.com',
                'example.org',
                'example.net',
                'test.com',
                'localhost'
            ];

            return testDomains.includes(domain);
        } catch {
            return false;
        }
    }

    // Domaines connus qui fonctionnent (pour les tests) - MISE À JOUR avec pages spécifiques
    static getKnownWorkingDomains(): string[] {
        return [
            'github.com',
            'github.com/features',
            'stackoverflow.com/questions',
            'wikipedia.org/wiki/Climate_change',
            'developer.mozilla.org/en-US/docs/Web/HTML'
        ];
    }

    // 🆕 Nouvelle méthode pour analyser le type d'URL
    static getUrlType(url: string): {
        type: 'homepage' | 'specific-page' | 'subdomain';
        domain: string;
        path: string;
        description: string;
    } {
        try {
            const urlObj = new URL(url);
            const domain = urlObj.hostname;
            const path = urlObj.pathname;

            let type: 'homepage' | 'specific-page' | 'subdomain';
            let description: string;

            if (path === '/' || path === '') {
                type = 'homepage';
                description = 'Page d\'accueil';
            } else {
                type = 'specific-page';
                if (path.includes('/blog/') || path.includes('/article/')) {
                    description = 'Article/Blog';
                } else if (path.includes('/product/') || path.includes('/shop/')) {
                    description = 'Page produit';
                } else if (path.includes('/contact') || path.includes('/about')) {
                    description = 'Page institutionnelle';
                } else if (path.includes('/search') || path.includes('/query')) {
                    description = 'Page de recherche';
                } else {
                    description = 'Page spécifique';
                }
            }

            return {
                type,
                domain,
                path,
                description
            };
        } catch {
            return {
                type: 'homepage',
                domain: url,
                path: '/',
                description: 'URL invalide'
            };
        }
    }
}