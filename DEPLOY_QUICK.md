# ⚡ Déploiement Rapide (10 minutes)

Guide ultra-rapide pour déployer l'application pour le hackathon.

## 🎯 Solution Recommandée pour Hackathon

**Frontend : AWS Amplify** (gratuit, 5 min)  
**Backend : Railway** (gratuit, 5 min)

---

## 📦 Partie 1 : Backend sur Railway (5 min)

### Étapes :

1. **Créer un compte**
   - Aller sur [railway.app](https://railway.app)
   - Se connecter avec GitHub

2. **Créer un projet**
   - Cliquer sur "New Project"
   - Choisir "Deploy from GitHub repo"
   - Sélectionner votre repository

3. **Configurer le service**
   - Cliquer sur "+ New" → "GitHub Repo"
   - Sélectionner le dossier **`backend`** uniquement
   - Railway détecte automatiquement Node.js

4. **Variables d'environnement** (optionnel)
   - Ouvrir "Variables"
   - Ajouter :
     ```
     PORT=3001
     NODE_ENV=production
     ```

5. **Obtenir l'URL**
   - Une fois déployé, cliquer sur le service
   - Cliquer sur le domaine généré (ex: `xxx.up.railway.app`)
   - **Copier cette URL** (vous en aurez besoin après)

✅ **Backend déployé !** URL : `https://xxx.up.railway.app`

---

## 🌐 Partie 2 : Frontend sur AWS Amplify (5 min)

### Étapes :

1. **Préparer le repository**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Créer l'app Amplify**
   - Aller sur [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Cliquer sur "New app" → "Host web app"
   - Choisir votre Git provider (GitHub/GitLab)
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
     Value: https://xxx.up.railway.app  (l'URL de votre backend Railway)
     ```
   - Sauvegarder et redémarrer le build (si nécessaire)

5. **Attendre le déploiement**
   - Le build prend 2-3 minutes
   - Une fois terminé, vous avez une URL : `https://xxx.amplifyapp.com`

✅ **Frontend déployé !** URL : `https://xxx.amplifyapp.com`

---

## ✅ Vérification

1. **Tester le backend**
   - Ouvrir : `https://xxx.up.railway.app/api/health`
   - Devrait afficher : `{"status":"OK",...}`

2. **Tester le frontend**
   - Ouvrir l'URL Amplify
   - Tester le quiz complet
   - Vérifier la console (F12) pour les erreurs

---

## 🔧 Si ça ne marche pas

### Erreur CORS

Modifier `backend/server.js` ligne 12, ajouter votre domaine Amplify :

```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'https://xxx.amplifyapp.com', // Ajouter votre URL Amplify
  // ...
]
```

Puis redéployer sur Railway.

### Build Amplify échoue

1. Vérifier les logs dans Amplify Console
2. S'assurer que `amplify.yml` existe à la racine
3. Vérifier que tous les fichiers sont commités

---

## 💰 Coûts

- **AWS Amplify** : Gratuit (1000 min build/mois)
- **Railway** : Gratuit ($5 crédit/mois)

**Total : GRATUIT pour le hackathon !** 🎉

---

## 📝 Checklist Finale

- [ ] Backend déployé sur Railway
- [ ] URL backend copiée
- [ ] Frontend déployé sur Amplify
- [ ] Variable `VITE_API_URL` configurée
- [ ] Application testée complètement
- [ ] Pas d'erreurs dans la console

---

## 🎯 URLs Finales

- **Frontend** : `https://xxx.amplifyapp.com`
- **Backend** : `https://xxx.up.railway.app`

**Parfait pour la présentation ! 🏆**

---

**Temps total : ~10 minutes** ⚡

