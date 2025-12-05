# 🚀 Guide de Déploiement AWS

Guide complet pour déployer **Decathlon Postural Health** sur AWS.

## 📋 Architecture de Déploiement

- **Frontend (React)** : AWS Amplify
- **Backend (Node.js)** : AWS Elastic Beanstalk

---

## 🌐 Option 1 : Déploiement Frontend sur AWS Amplify (Recommandé)

### Prérequis
- Compte AWS
- Git repository (GitHub, GitLab, ou Bitbucket)
- Node.js installé localement

### Étapes de Déploiement

#### 1. Préparer le Repository

```bash
# Vérifier que tout est commité
git add .
git commit -m "Ready for AWS deployment"
git push origin main
```

#### 2. Déployer avec AWS Amplify

1. **Connecter à AWS Amplify**
   - Aller sur [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Cliquer sur "New app" → "Host web app"
   - Choisir votre Git provider (GitHub, GitLab, etc.)
   - Autoriser l'accès à votre repository

2. **Configurer le Build**
   - Branch : `main` (ou votre branche principale)
   - Build settings : Le fichier `amplify.yml` est déjà configuré
   - Cliquer sur "Save and deploy"

3. **Variables d'Environnement** (Important !)
   - Aller dans "Environment variables"
   - Ajouter : `VITE_API_URL` = `https://YOUR_BACKEND_URL.elasticbeanstalk.com`
   - Redémarrer le build

#### 3. Configuration Amplify

Le fichier `amplify.yml` est déjà créé et configure :
- Installation des dépendances frontend
- Build avec Vite
- Déploiement du dossier `frontend/dist`

---

## ⚙️ Option 2 : Déploiement Backend sur AWS Elastic Beanstalk

### Prérequis
- AWS CLI installé et configuré
- Compte AWS avec permissions Elastic Beanstalk
- EB CLI installé : `pip install awsebcli`

### Installation EB CLI

```bash
# Windows
pip install awsebcli

# Mac/Linux
pip3 install awsebcli --user

# Vérifier l'installation
eb --version
```

### Étapes de Déploiement Backend

#### 1. Initialiser Elastic Beanstalk

```bash
cd backend

# Initialiser EB (première fois seulement)
eb init

# Choisir :
# - Region : eu-west-1 (ou votre région)
# - Platform : Node.js
# - Platform version : Node.js 18
# - Application name : decathlon-postural-health
```

#### 2. Créer l'Environnement

```bash
# Créer l'environnement (première fois)
eb create decathlon-postural-health-backend

# Ou si déjà créé, utiliser :
eb use decathlon-postural-health-backend
```

#### 3. Configurer l'Environnement

```bash
# Ajouter les variables d'environnement
eb setenv NODE_ENV=production PORT=8080

# Ouvrir la console AWS pour voir l'URL
eb open
```

#### 4. Déployer

```bash
# Déployer les changements
eb deploy

# Voir les logs
eb logs

# Vérifier le statut
eb status
```

#### 5. Obtenir l'URL du Backend

```bash
eb status
# Notez l'URL : http://decathlon-postural-health-backend.XXXXX.elasticbeanstalk.com
```

---

## 🔗 Option 3 : Solution Alternative Simple (Railway/Render)

Pour un hackathon, vous pouvez aussi utiliser des solutions plus simples :

### Backend sur Railway (Gratuit pour commencer)

1. Aller sur [Railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub repo"
3. Sélectionner le dossier `backend`
4. Variables d'environnement :
   - `PORT` = `3001`
   - `NODE_ENV` = `production`
5. Obtenir l'URL du backend

### Backend sur Render (Gratuit)

1. Aller sur [Render.com](https://render.com)
2. "New" → "Web Service"
3. Connecter votre repo GitHub
4. Configuration :
   - Root Directory : `backend`
   - Build Command : `npm install`
   - Start Command : `node server.js`
   - Environment : `Node`
5. Variables d'environnement :
   - `PORT` = `3001`

---

## 🌍 Configuration des Variables d'Environnement

### Frontend (AWS Amplify)

Dans AWS Amplify Console → Environment variables :

```
VITE_API_URL = https://votre-backend-url.elasticbeanstalk.com
```

### Backend (Elastic Beanstalk)

```bash
eb setenv NODE_ENV=production PORT=8080 FRONTEND_URL=https://votre-app.amplifyapp.com
```

Ou dans la console AWS :
- Elastic Beanstalk → Configuration → Software → Environment properties

---

## ✅ Vérification du Déploiement

### Backend

```bash
# Test de santé
curl https://votre-backend-url.elasticbeanstalk.com/api/health

# Devrait retourner :
# {"status":"OK","message":"Decathlon Postural Health API is running"}
```

### Frontend

1. Ouvrir l'URL Amplify
2. Ouvrir la console développeur (F12)
3. Vérifier qu'il n'y a pas d'erreurs CORS
4. Tester le quiz complet

---

## 🔧 Troubleshooting

### Erreur CORS

Si vous voyez des erreurs CORS :

1. Vérifier que `FRONTEND_URL` est bien configurée dans le backend
2. Modifier `backend/server.js` pour ajouter votre domaine Amplify

```javascript
const allowedOrigins = [
  'https://votre-app.amplifyapp.com',
  // ...
]
```

### Build échoue sur Amplify

1. Vérifier les logs dans AWS Amplify Console
2. S'assurer que `package.json` est correct
3. Vérifier que `amplify.yml` pointe vers le bon dossier

### Backend ne démarre pas

1. Vérifier les logs : `eb logs`
2. S'assurer que le PORT est bien configuré (8080 pour EB)
3. Vérifier que toutes les dépendances sont dans `package.json`

---

## 📦 Structure des Fichiers de Configuration

```
.
├── amplify.yml                    # Configuration AWS Amplify
├── .elasticbeanstalk/
│   └── config.yml                 # Configuration Elastic Beanstalk
├── backend/
│   ├── .ebextensions/
│   │   ├── nodecommand.config     # Commande de démarrage
│   │   └── environment.config     # Variables d'environnement
│   └── server.js                  # Serveur Express
└── frontend/
    ├── .env.production            # Variables d'environnement production
    └── vite.config.js             # Configuration Vite
```

---

## 💰 Estimation des Coûts AWS

### AWS Amplify (Frontend)
- **Gratuit** : 15 GB de build storage, 1000 minutes de build/mois
- Au-delà : ~$0.01 par GB de build storage

### Elastic Beanstalk (Backend)
- **Gratuit** : L'environnement EC2 seulement
- EC2 t2.micro : **Gratuit** (Free Tier) pendant 12 mois
- Après : ~$10-15/mois pour t2.micro

### Total pour un Hackathon
- **Gratuit** pendant les premiers mois (Free Tier)

---

## 🚀 Déploiement Rapide (5 minutes)

### Frontend Amplify

1. Push sur GitHub
2. AWS Amplify → New app → Connect repo
3. Ajouter variable : `VITE_API_URL`
4. Deploy

### Backend Railway (Plus simple)

1. Railway.app → New Project → GitHub
2. Sélectionner dossier `backend`
3. Déployer
4. Copier l'URL et l'ajouter dans Amplify

---

## 📝 Checklist de Déploiement

- [ ] Repository Git prêt (commité et pushé)
- [ ] Backend déployé (Elastic Beanstalk ou Railway)
- [ ] URL backend obtenue
- [ ] Frontend déployé sur Amplify
- [ ] Variable `VITE_API_URL` configurée dans Amplify
- [ ] Test complet de l'application
- [ ] Vérification des logs (pas d'erreurs)
- [ ] Test sur mobile (responsive)

---

## 🎯 URLs Finales

Après déploiement, vous aurez :

- **Frontend** : `https://XXXXX.amplifyapp.com`
- **Backend** : `https://XXXXX.elasticbeanstalk.com`

Parfait pour la présentation du hackathon ! 🏆

---

**Besoin d'aide ?** Vérifiez les logs dans les consoles AWS/Railway pour diagnostiquer les problèmes.

