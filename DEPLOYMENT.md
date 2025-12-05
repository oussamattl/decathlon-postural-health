# 🚀 Guide de Déploiement AWS Complet

Guide complet pour déployer **Decathlon Postural Health** sur AWS.

## 📋 Architecture AWS

- **Frontend (React)** : AWS Amplify
- **Backend (Node.js)** : AWS Elastic Beanstalk

---

## 🌐 Partie 1 : Déploiement Frontend sur AWS Amplify

### Prérequis
- Compte AWS
- Git repository (GitHub, GitLab, ou Bitbucket)
- Repository prêt avec le code

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
   - Choisir votre Git provider (GitHub, GitLab, Bitbucket)
   - Autoriser l'accès à votre repository

2. **Configurer le Build**
   - Branch : `main` (ou votre branche principale)
   - Build settings : Le fichier `amplify.yml` est déjà configuré ✅
   - Cliquer sur "Save and deploy"

3. **Variables d'Environnement** (Important !)
   - Attendre que le backend soit déployé (Partie 2)
   - Aller dans "App settings" → "Environment variables"
   - Ajouter :
     ```
     Key: VITE_API_URL
     Value: http://YOUR_BACKEND_URL.elasticbeanstalk.com
     ```
   - Redémarrer le build si nécessaire

#### 3. Configuration Amplify

Le fichier `amplify.yml` est déjà créé et configure :
- Installation des dépendances frontend
- Build avec Vite
- Déploiement du dossier `frontend/dist`

---

## ⚙️ Partie 2 : Déploiement Backend sur AWS Elastic Beanstalk

### Prérequis
- AWS CLI installé et configuré
- Compte AWS avec permissions Elastic Beanstalk
- EB CLI installé

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
# - Region : eu-west-1 (ou votre région préférée)
# - Platform : Node.js
# - Platform version : Node.js 18
# - Application name : decathlon-postural-health
```

#### 2. Créer l'Environnement

```bash
# Créer l'environnement (première fois)
eb create decathlon-backend

# ⏱️ Attendre 5-10 minutes (création de l'infrastructure)
```

#### 3. Configurer l'Environnement

```bash
# Obtenir l'URL du backend
eb status

# Configurer les variables d'environnement
eb setenv NODE_ENV=production FRONTEND_URL=https://votre-app.amplifyapp.com

# (Mettre à jour FRONTEND_URL après avoir déployé le frontend)
```

#### 4. Obtenir l'URL du Backend

```bash
eb status
# Notez l'URL : http://decathlon-backend.XXXXX.elasticbeanstalk.com
```

#### 5. Déployer les Modifications

```bash
# Déployer les changements
eb deploy

# Voir les logs
eb logs

# Vérifier le statut
eb status

# Ouvrir dans le navigateur
eb open
```

---

## 🌍 Configuration des Variables d'Environnement

### Frontend (AWS Amplify)

Dans AWS Amplify Console → Environment variables :

```
VITE_API_URL = http://decathlon-backend.XXXXX.elasticbeanstalk.com
```

### Backend (Elastic Beanstalk)

```bash
eb setenv NODE_ENV=production FRONTEND_URL=https://votre-app.amplifyapp.com
```

Ou dans la console AWS :
- Elastic Beanstalk → Votre environnement → Configuration → Software → Environment properties

---

## ✅ Vérification du Déploiement

### Backend

```bash
# Test de santé
curl http://decathlon-backend.XXXXX.elasticbeanstalk.com/api/health

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

1. Vérifier que `FRONTEND_URL` est bien configurée dans Elastic Beanstalk :
   ```bash
   eb setenv FRONTEND_URL=https://votre-app.amplifyapp.com
   eb deploy
   ```

2. Le serveur accepte déjà automatiquement les domaines `*.amplifyapp.com`

### Build échoue sur Amplify

1. Vérifier les logs dans AWS Amplify Console
2. S'assurer que `package.json` est correct
3. Vérifier que `amplify.yml` pointe vers le bon dossier (`frontend`)

### Backend ne démarre pas

1. Vérifier les logs : `cd backend && eb logs`
2. S'assurer que le PORT est bien configuré (EB utilise automatiquement le port 8080)
3. Vérifier que toutes les dépendances sont dans `package.json`

### Backend ne répond pas

1. Vérifier que le service est "Healthy" dans Elastic Beanstalk
2. Vérifier les logs pour les erreurs
3. Vérifier que le health check path `/api/health` fonctionne

---

## 📦 Structure des Fichiers de Configuration

```
.
├── amplify.yml                    # Configuration AWS Amplify
├── .elasticbeanstalk/
│   └── config.yml                 # Configuration Elastic Beanstalk (généré par eb init)
├── backend/
│   ├── .ebextensions/
│   │   ├── nodecommand.config     # Commande de démarrage Node.js
│   │   └── environment.config     # Variables d'environnement
│   └── server.js                  # Serveur Express
└── frontend/
    ├── src/
    │   └── config/
    │       └── api.js             # Configuration API centralisée
    └── vite.config.js             # Configuration Vite
```

---

## 💰 Estimation des Coûts AWS

### AWS Amplify (Frontend)
- **Gratuit** : 15 GB de build storage, 1000 minutes de build/mois
- Au-delà : ~$0.01 par GB de build storage

### Elastic Beanstalk (Backend)
- **Gratuit** : Free Tier EC2 t2.micro pendant 12 mois
- EC2 t2.micro : **Gratuit** (Free Tier) pendant 12 mois
- Après 12 mois : ~$10-15/mois pour t2.micro

### Total pour un Hackathon
- **Gratuit** pendant les 12 premiers mois (Free Tier) 🎉

---

## 🚀 Commandes Utiles

### Backend

```bash
cd backend

# Créer un environnement
eb create nom-environnement

# Déployer
eb deploy

# Voir les logs
eb logs

# Vérifier le statut
eb status

# Ouvrir dans le navigateur
eb open

# Configurer les variables
eb setenv NOM_VAR=valeur

# Lister les environnements
eb list

# Changer d'environnement
eb use nom-environnement
```

### Frontend

Les modifications sont automatiquement déployées via Git :
- Chaque push sur `main` déclenche un nouveau build
- Vérifier les logs dans AWS Amplify Console

---

## 📝 Checklist de Déploiement

- [ ] Repository Git prêt (commité et pushé)
- [ ] AWS CLI et EB CLI installés
- [ ] Backend initialisé avec `eb init`
- [ ] Backend déployé avec `eb create`
- [ ] URL backend obtenue
- [ ] Frontend déployé sur Amplify
- [ ] Variable `VITE_API_URL` configurée dans Amplify
- [ ] Variable `FRONTEND_URL` configurée dans Elastic Beanstalk
- [ ] Test complet de l'application
- [ ] Vérification des logs (pas d'erreurs)
- [ ] Test sur mobile (responsive)

---

## 🎯 URLs Finales

Après déploiement, vous aurez :

- **Frontend** : `https://XXXXX.amplifyapp.com`
- **Backend** : `http://XXXXX.elasticbeanstalk.com`

Parfait pour la présentation du hackathon ! 🏆

---

## 📚 Ressources

- [AWS Amplify Documentation](https://docs.aws.amazon.com/amplify/)
- [AWS Elastic Beanstalk Documentation](https://docs.aws.amazon.com/elasticbeanstalk/)
- [EB CLI Documentation](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html)

---

**Besoin d'aide ?** Vérifiez les logs dans les consoles AWS pour diagnostiquer les problèmes.
