# ⚡ Déploiement AWS Rapide (15 minutes)

Guide ultra-rapide pour déployer l'application sur AWS.

## 🎯 Architecture AWS

**Frontend : AWS Amplify** (gratuit)  
**Backend : AWS Elastic Beanstalk** (gratuit avec Free Tier)

---

## 📦 Partie 1 : Backend sur AWS Elastic Beanstalk (10 min)

### Prérequis

Installer AWS EB CLI :
```bash
pip install awsebcli
# ou sur Mac/Linux
pip3 install awsebcli --user
```

### Étapes :

1. **Aller dans le dossier backend**
   ```bash
   cd backend
   ```

2. **Initialiser Elastic Beanstalk** (première fois seulement)
   ```bash
   eb init
   ```
   
   Réponses :
   - Region : `eu-west-1` (ou votre région préférée)
   - Platform : `Node.js`
   - Platform version : `Node.js 18`
   - Application name : `decathlon-postural-health`

3. **Créer l'environnement**
   ```bash
   eb create decathlon-backend
   ```
   
   ⏱️ Attendre 5-10 minutes (première création)

4. **Obtenir l'URL du backend**
   ```bash
   eb status
   ```
   
   Copier l'URL (ex: `decathlon-backend.XXXXX.elasticbeanstalk.com`)

5. **Configurer les variables d'environnement**
   ```bash
   eb setenv NODE_ENV=production FRONTEND_URL=https://votre-app.amplifyapp.com
   ```

✅ **Backend déployé !** URL : `http://decathlon-backend.XXXXX.elasticbeanstalk.com`

---

## 🌐 Partie 2 : Frontend sur AWS Amplify (5 min)

### Étapes :

1. **Préparer le repository**
   ```bash
   git add .
   git commit -m "Ready for AWS deployment"
   git push origin main
   ```

2. **Créer l'app Amplify**
   - Aller sur [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Cliquer sur "New app" → "Host web app"
   - Choisir votre Git provider (GitHub/GitLab/Bitbucket)
   - Autoriser l'accès à votre repository

3. **Configurer le build**
   - Branch : `main`
   - Build settings : Le fichier `amplify.yml` est déjà configuré ✅
   - Cliquer sur "Save and deploy"

4. **Ajouter la variable d'environnement** (CRITIQUE)
   - Une fois le build démarré, aller dans "App settings" → "Environment variables"
   - Cliquer sur "Manage variables"
   - Ajouter :
     ```
     Key: VITE_API_URL
     Value: http://decathlon-backend.XXXXX.elasticbeanstalk.com
     ```
     (Utiliser l'URL obtenue à l'étape 4 du backend)
   - Sauvegarder et redémarrer le build

5. **Attendre le déploiement**
   - Le build prend 2-3 minutes
   - Une fois terminé, vous avez une URL : `https://xxx.amplifyapp.com`

✅ **Frontend déployé !** URL : `https://xxx.amplifyapp.com`

---

## ✅ Vérification

1. **Tester le backend**
   - Ouvrir : `http://decathlon-backend.XXXXX.elasticbeanstalk.com/api/health`
   - Devrait afficher : `{"status":"OK",...}`

2. **Tester le frontend**
   - Ouvrir l'URL Amplify
   - Tester le quiz complet
   - Vérifier la console (F12) pour les erreurs

---

## 🔧 Déploiement des Modifications

### Backend
```bash
cd backend
eb deploy
```

### Frontend
- Les modifications sont automatiquement déployées via Git
- Chaque push sur `main` déclenche un nouveau déploiement

---

## 🔧 Si ça ne marche pas

### Erreur CORS

Vérifier que `FRONTEND_URL` est bien configurée dans Elastic Beanstalk :
```bash
cd backend
eb setenv FRONTEND_URL=https://votre-app.amplifyapp.com
eb deploy
```

### Build Amplify échoue

1. Vérifier les logs dans Amplify Console
2. S'assurer que `amplify.yml` existe à la racine
3. Vérifier que tous les fichiers sont commités

### Backend ne démarre pas

1. Vérifier les logs : `cd backend && eb logs`
2. Vérifier que le PORT est bien configuré (EB utilise automatiquement le port 8080)

---

## 💰 Coûts AWS

- **AWS Amplify** : Gratuit (1000 min build/mois)
- **Elastic Beanstalk** : Gratuit (Free Tier EC2 t2.micro pendant 12 mois)

**Total : GRATUIT pour le hackathon !** 🎉

---

## 📝 Checklist Finale

- [ ] Backend déployé sur Elastic Beanstalk
- [ ] URL backend obtenue
- [ ] Frontend déployé sur Amplify
- [ ] Variable `VITE_API_URL` configurée dans Amplify
- [ ] Variable `FRONTEND_URL` configurée dans Elastic Beanstalk
- [ ] Application testée complètement
- [ ] Pas d'erreurs dans la console

---

## 🎯 URLs Finales

- **Frontend** : `https://xxx.amplifyapp.com`
- **Backend** : `http://xxx.elasticbeanstalk.com`

**Parfait pour la présentation ! 🏆**

---

**Temps total : ~15 minutes** ⚡
