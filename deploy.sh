#!/bin/bash

# Script de déploiement AWS pour Decathlon Postural Health
# Usage: ./deploy.sh [frontend|backend|all]

set -e

echo "🚀 Déploiement AWS - Decathlon Postural Health"
echo "=============================================="

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
    echo "   VITE_API_URL = http://VOTRE_BACKEND_URL.elasticbeanstalk.com"
    echo ""
    echo -e "${GREEN}✅ Frontend prêt pour déploiement${NC}"
}

deploy_backend() {
    echo -e "${BLUE}📦 Déploiement Backend (AWS Elastic Beanstalk)...${NC}"
    
    if ! command -v eb &> /dev/null; then
        echo -e "${YELLOW}⚠️  EB CLI n'est pas installé${NC}"
        echo "Installez-le avec :"
        echo "  Windows: pip install awsebcli"
        echo "  Mac/Linux: pip3 install awsebcli --user"
        exit 1
    fi
    
    cd backend
    
    if [ ! -d ".elasticbeanstalk" ]; then
        echo "Initialisation d'Elastic Beanstalk..."
        eb init
    fi
    
    # Vérifier si l'environnement existe
    if ! eb list &>/dev/null || [ -z "$(eb list 2>/dev/null)" ]; then
        echo "Création de l'environnement..."
        eb create decathlon-backend
    else
        echo "Déploiement sur l'environnement existant..."
        eb deploy
    fi
    
    echo -e "${GREEN}✅ Backend déployé${NC}"
    echo ""
    echo "URL du backend :"
    eb status | grep "CNAME" || eb status
    
    echo ""
    echo "📝 N'oubliez pas de :"
    echo "   1. Configurer FRONTEND_URL dans Elastic Beanstalk après déploiement du frontend"
    echo "   2. Tester : eb open"
    
    cd ..
}

deploy_all() {
    echo -e "${YELLOW}Déploiement complet sur AWS${NC}"
    echo ""
    echo "Ordre recommandé :"
    echo "1. Backend d'abord (pour obtenir l'URL)"
    echo "2. Frontend ensuite (pour configurer VITE_API_URL)"
    echo ""
    read -p "Commencer par le backend ? (o/n) : " choice
    
    if [[ $choice == "o" || $choice == "O" ]]; then
        deploy_backend
        echo ""
        echo -e "${YELLOW}Maintenant déployez le frontend :${NC}"
        deploy_frontend
    else
        deploy_frontend
        echo ""
        echo -e "${YELLOW}Maintenant déployez le backend :${NC}"
        deploy_backend
    fi
}

case $DEPLOY_TYPE in
    frontend)
        deploy_frontend
        ;;
    backend)
        deploy_backend
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
echo -e "${GREEN}🎉 Instructions de déploiement affichées !${NC}"
echo ""
echo "📚 Pour plus de détails, consultez :"
echo "   - DEPLOY_QUICK.md (guide rapide)"
echo "   - DEPLOYMENT.md (guide complet)"
