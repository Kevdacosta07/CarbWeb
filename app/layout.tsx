
import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from "@/app/component/Navigation";

export const metadata: Metadata = {
    metadataBase: new URL('https://carbweb.ch'),
    title: 'Calculer l\'empreinte carbone d\'un site web - Analyse gratuite et précise',
    description: 'Calculez gratuitement l\'empreinte carbone de votre site web avec nos outils scientifiques basés sur les APIs Google et les standards IEA 2024. Analyse en temps réel et conseils d\'optimisation.',
    keywords: [
        'calculer empreinte carbone site web',
        'analyse CO2 site internet',
        'impact environnemental web',
        'optimisation écologique site',
        'mesure carbone digital',
        'calculateur empreinte numérique',
        'site web éco-responsable',
        'audit environnemental web',
        'CO2 internet',
        'green web hosting'
    ].join(', '),
    authors: [{ name: 'CarbWeb' }],
    openGraph: {
        title: 'Calculer l\'empreinte carbone d\'un site web - CarbWeb',
        description: 'Calculez gratuitement l\'empreinte carbone de votre site web avec nos outils scientifiques basés sur les APIs Google et les standards IEA 2024.',
        type: 'website',
        locale: 'fr_FR',
        url: 'https://carbweb.ch',
        siteName: 'CarbWeb',
        images: [
            {
                url: '/og-image.png?v=3',
                width: 1200,
                height: 630,
                alt: 'CarbWeb - Calculateur d\'empreinte carbone web'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Calculer l\'empreinte carbone d\'un site web',
        description: 'Calculez gratuitement l\'empreinte carbone de votre site web avec nos outils scientifiques.',
        images: ['/og-image.png?v=3']
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: 'https://carbweb.ch',
    },
    category: 'Technology',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" suppressHydrationWarning>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />

            {/* Données structurées JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "CarbWeb - Calculateur d'empreinte carbone web",
                        "description": "Calculez gratuitement l'empreinte carbone de votre site web avec nos outils scientifiques basés sur les APIs Google et les standards IEA 2024.",
                        "url": "https://carbweb.ch",
                        "applicationCategory": "DeveloperApplication",
                        "operatingSystem": "All",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "EUR"
                        },
                        "featureList": [
                            "Calcul empreinte carbone site web",
                            "Analyse performance environnementale",
                            "Données Google PageSpeed Insights",
                            "Facteurs CO2 IEA 2024",
                            "Vérification hébergement vert",
                            "Conseils optimisation écologique"
                        ],
                        "creator": {
                            "@type": "Organization",
                            "name": "CarbWeb"
                        }
                    }),
                }}
            />

            {/* FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Comment calculer l'empreinte carbone d'un site web ?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Pour calculer l'empreinte carbone d'un site web, nous analysons la taille des fichiers, le nombre de requêtes HTTP, et appliquons les facteurs CO2 officiels IEA 2024. Notre outil utilise les APIs Google PageSpeed Insights pour obtenir des données précises en temps réel."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Quel outil utiliser pour mesurer l'impact environnemental d'un site ?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "CarbWeb utilise les APIs officielles Google PageSpeed Insights et Green Web Foundation pour mesurer précisément l'impact environnemental d'un site web. Les calculs sont basés sur les standards scientifiques IEA 2024."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Est-ce gratuit de calculer l'empreinte carbone de mon site web ?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Oui, notre calculateur d'empreinte carbone web est entièrement gratuit. Vous pouvez analyser n'importe quel site web et obtenir un rapport détaillé avec des conseils d'optimisation."
                                }
                            }
                        ]
                    }),
                }}
            />

            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        (function() {
                            try {
                                const theme = localStorage.getItem('theme') || 'dark';
                                document.documentElement.classList.toggle('dark', theme === 'dark');
                            } catch (e) {}
                        })()
                    `,
                }}
            />
        </head>
        <body className="bg-black text-white antialiased overflow-x-hidden">
        <Navigation />
        {children}
        </body>
        </html>
    );
}