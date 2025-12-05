#!/bin/bash

# Script de déploiement rapide pour Decathlon Postural Health
# Usage: ./deploy.sh [frontend|backend|all]

set -e

echo "🚀 Déploiement Decathlon Postural Health"
echo "========================================"

DEPLOY_TYPE=${1:-all}

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

deploy_frontend() {
    echo -e "${BLUE}📦 Déploiement Frontend (AWS Amplify)...${NC}"
    echo ""
    echo "1. Assurez-vous que votre code est pushé sur GitHub/GitLab"
    echo "2. Allez sur https://console.aws.amazon.com/amplify/"
    echo "3. Cliquez sur 'New app' → 'Host web app'"
    echo "4. Connectez votre repository"
    echo "5. Ajoutez la variable d'environnement :"
    echo "   VITE_API_URL = https://VOTRE_BACKEND_URL"
    echo ""
    echo -e "${GREEN}✅ Frontend prêt pour déploiement${NC}"
}

deploy_backend_eb() {
    echo -e "${BLUE}📦 Déploiement Backend (AWS Elastic Beanstalk)...${NC}"
    
    if ! command -v eb &> /dev/null; then
        echo -e "${YELLOW}⚠️  EB CLI n'est pas installé${NC}"
        echo "Installez-le avec : pip install awsebcli"
        exit 1
    fi
    
    cd backend
    
    if [ ! -d ".elasticbeanstalk" ]; then
        echo "Initialisation d'Elastic Beanstalk..."
        eb init
    fi
    
    echo "Déploiement..."
    eb deploy
    
    echo -e "${GREEN}✅ Backend déployé${NC}"
    echo "URL du backend :"
    eb status | grep "CNAME"
    
    cd ..
}

deploy_backend_railway() {
    echo -e "${BLUE}📦 Déploiement Backend (Railway)...${NC}"
    echo ""
    echo "1. Allez sur https://railway.app"
    echo "2. Créez un nouveau projet"
    echo "3. Connectez votre repository GitHub"
    echo "4. Sélectionnez le dossier 'backend'"
    echo "5. Ajoutez les variables d'environnement :"
    echo "   - PORT = 3001"
    echo "   - NODE_ENV = production"
    echo ""
    echo -e "${GREEN}✅ Instructions Railway affichées${NC}"
}

deploy_all() {
    echo -e "${YELLOW}Choisissez votre méthode de déploiement :${NC}"
    echo "1) AWS Elastic Beanstalk (recommandé pour AWS complet)"
    echo "2) Railway (plus simple, gratuit)"
    echo ""
    read -p "Votre choix (1 ou 2) : " choice
    
    case $choice in
        1)
            deploy_backend_eb
            deploy_frontend
            ;;
        2)
            deploy_backend_railway
            deploy_frontend
            ;;
        *)
            echo "Choix invalide"
            exit 1
            ;;
    esac
}

case $DEPLOY_TYPE in
    frontend)
        deploy_frontend
        ;;
    backend)
        echo "Choisissez :"
        echo "1) AWS Elastic Beanstalk"
        echo "2) Railway"
        read -p "Votre choix : " choice
        if [ $choice -eq 1 ]; then
            deploy_backend_eb
        else
            deploy_backend_railway
        fi
        ;;
    all)
        deploy_all
        ;;
    *)
        echo "Usage: ./deploy.sh [frontend|backend|all]"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}🎉 Déploiement terminé !${NC}"
echo ""
echo "📝 N'oubliez pas de :"
echo "   1. Configurer VITE_API_URL dans Amplify avec l'URL du backend"
echo "   2. Tester l'application complète"
echo "   3. Vérifier les logs en cas d'erreur"

