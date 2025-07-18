# CarbWeb - Calculateur d'empreinte carbone web

Une application web moderne construite avec Next.js pour calculer et analyser l'empreinte carbone des sites web.

## 🌱 À propos du projet

CarbWeb est un outil d'analyse qui permet de mesurer l'impact environnemental des sites web en calculant leur empreinte carbone. L'application fournit des métriques détaillées et des conseils pour réduire l'impact environnemental des sites web.

**Site web :** https://carbweb.ch

## 🎯 Objectifs

- Sensibiliser à l'impact environnemental du web
- Fournir des métriques précises sur l'empreinte carbone des sites web
- Proposer des conseils concrets pour réduire l'impact environnemental
- Démocratiser l'accès aux outils d'analyse carbone web

## 🚀 Fonctionnalités principales

### Analyse d'empreinte carbone
- Calcul automatique de l'empreinte carbone d'un site web
- Analyse des ressources (CSS, JS, images, etc.)
- Évaluation de l'efficacité énergétique
- Comparaison avec les standards de l'industrie

### Interface utilisateur
- Interface moderne et intuitive
- Responsive design pour tous les appareils
- Affichage des résultats en temps réel
- Visualisation des données sous forme de graphiques

### Conseils écologiques
- Recommandations personnalisées basées sur l'analyse
- Bonnes pratiques d'écoconception web
- Liens vers des ressources techniques spécialisées
- Méthodologie transparente et accessible

## 🛠️ Architecture technique

### Stack technologique
- **Next.js 15.3.3** - Framework React avec App Router
- **React 19.0.0** - Bibliothèque UI
- **TypeScript** - Langage de programmation typé
- **Tailwind CSS** - Framework CSS utilitaire
- **Docker** - Conteneurisation pour le déploiement

### Structure du projet

**Dossier racine :**
- `app/` - App Router de Next.js
- `utils/` - Utilitaires et calculateurs
- `public/` - Assets statiques
- `.github/workflows/` - CI/CD automatisé
- `Dockerfile` - Configuration Docker

**Dossier app/ :**
- `api/analyze/` - API d'analyse carbone
- `component/` - Composants React réutilisables
- `hooks/` - Hooks personnalisés
- `methodologie/` - Page explicative de la méthodologie
- `layout.tsx` - Layout principal
- `page.tsx` - Page d'accueil
- `globals.css` - Styles globaux

**Composants principaux :**
- `AnalysisModal.tsx` - Modal d'analyse détaillée
- `CarbonAnalyzer.tsx` - Composant principal d'analyse
- `CarbonResults.tsx` - Affichage des résultats
- `EcoTips.tsx` - Conseils écologiques personnalisés
- `Navigation.tsx` - Navigation principale
- `TechnicalLink.tsx` - Liens techniques

**Utilitaires :**
- `CarbonCalculator.ts` - Logique de calcul carbone
- `types.ts` - Types TypeScript
- `urlValidator.ts` - Validation d'URLs

## 🌍 Méthodologie de calcul

L'application utilise une méthodologie scientifique basée sur :

1. **Analyse des ressources**
    - Taille des fichiers téléchargés
    - Nombre de requêtes HTTP
    - Optimisation des images et médias

2. **Calcul énergétique**
    - Consommation des data centers
    - Efficacité du réseau de distribution
    - Mix énergétique par région géographique

3. **Conversion en CO2**
    - Facteurs d'émission actualisés (0.081 milligramme par byte)
    - Prise en compte du cycle de vie complet
    - Normalisation par visite utilisateur

## 🔧 Fonctionnalités techniques

### API d'analyse
- Intégration avec PageSpeed Insights API
- Analyse mobile et desktop
- Vérification de l'hébergement vert via Green Web Foundation
- Calcul précis de l'empreinte carbone

### Calculs avancés
- Coefficient CO2 de 0.081 milligramme par byte
- Réduction de 5% pour l'hébergement vert
- Comparaison avec la médiane web (0.8g CO2)
- Projections annuelles basées sur le trafic estimé

## 📊 Métriques fournies

- **Empreinte carbone totale** (en g CO2eq)
- **Empreinte par visite** (en g CO2eq/visite)
- **Comparaison sectorielle** (percentile)
- **Score d'écoconception** (sur 100)
- **Recommandations d'amélioration**

## 🔧 Déploiement et infrastructure

- **Hébergement** : Infrastructure cloud optimisée
- **CI/CD** : GitHub Actions pour le déploiement automatique
- **Docker** : Conteneurisation multi-étapes
- **Monitoring** : Suivi des performances et de la disponibilité
- **Sécurité** : HTTPS, validation des entrées, protection CSRF

## 📈 Roadmap

### Version actuelle (v1.0)
- ✅ Analyse basique d'empreinte carbone
- ✅ Interface utilisateur responsive
- ✅ Conseils écologiques
- ✅ Page méthodologie

### Prochaines versions
- 🔄 Analyse comparative multi-sites
- 🔄 Historique des analyses
- 🔄 API publique pour développeurs
- 🔄 Intégration avec outils de monitoring

## 📝 Documentation

- **Site web** : https://carbweb.ch
- **Méthodologie** : https://carbweb.ch/methodologie
- **Contact** : contact@helveit.ch

## 🏆 Impact et résultats

CarbWeb contribue à la sensibilisation environnementale du secteur web en fournissant des outils accessibles et des métriques fiables pour mesurer et réduire l'impact carbone des sites internet.

---

*Ce projet s'inscrit dans une démarche de développement durable et de responsabilité numérique.*