# 🚀 Déployer le Backend via Console AWS (SANS Python/EB CLI)

Méthode alternative : déployer directement depuis la console AWS, sans installer Python ni EB CLI.

---

## 📦 Méthode 1 : Via Console AWS (Recommandé si vous ne voulez pas installer Python)

### Étape 1 : Préparer le code

1. **Créer un fichier ZIP du backend**

   ```bash
   cd backend
   ```

   **Windows PowerShell :**
   ```powershell
   Compress-Archive -Path * -DestinationPath ../backend.zip -Exclude node_modules
   ```

   **Ou manuellement :**
   - Sélectionner tous les fichiers dans le dossier `backend` (sauf `node_modules`)
   - Clic droit → Envoyer vers → Dossier compressé
   - Renommer en `backend.zip`

2. **Vérifier le contenu du ZIP**
   
   Le ZIP doit contenir :
   - `package.json`
   - `server.js`
   - `data.js`
   - `.ebextensions/` (dossier)
   - **PAS** `node_modules/`

### Étape 2 : Créer l'application dans AWS Console

1. **Aller sur Elastic Beanstalk**
   - https://console.aws.amazon.com/elasticbeanstalk/
   - Cliquer sur **"Create application"**

2. **Configurer l'application**
   - **Application name** : `decathlon-postural-health`
   - **Description** : (optionnel)
   - Cliquer sur **"Create"**

### Étape 3 : Créer l'environnement

1. **Dans votre application, cliquer sur "Create environment"**

2. **Choisir "Web server environment"**

3. **Configuration de base :**
   - **Environment name** : `decathlon-backend`
   - **Domain** : `decathlon-backend` (ou laisser auto)
   - **Description** : (optionnel)

4. **Platform :**
   - **Platform** : `Node.js`
   - **Platform branch** : `Node.js 18 running on 64bit Amazon Linux 2023`
   - **Platform version** : (laisser la dernière)

5. **Application code :**
   - Choisir **"Upload your code"**
   - Cliquer sur **"Choose file"**
   - Sélectionner votre `backend.zip`
   - Cliquer sur **"Create environment"**

6. ⏱️ **ATTENDRE 5-10 minutes** pendant la création

### Étape 4 : Obtenir l'URL

Une fois créé, l'URL s'affiche en haut de la page :
```
http://decathlon-backend.xxxxx.elasticbeanstalk.com
```

**Copiez cette URL !**

### Étape 5 : Configurer les variables d'environnement

1. Dans votre environnement, aller dans **"Configuration"**
2. Cliquer sur **"Edit"** dans la section **"Software"**
3. Dans **"Environment properties"**, ajouter :
   - **Name** : `NODE_ENV` | **Value** : `production`
   - **Name** : `FRONTEND_URL` | **Value** : `https://votre-app.amplifyapp.com`
4. Cliquer sur **"Apply"**

### Étape 6 : Tester

Ouvrir dans le navigateur :
```
http://decathlon-backend.xxxxx.elasticbeanstalk.com/api/health
```

Vous devriez voir :
```json
{"status":"OK","message":"Decathlon Postural Health API is running"}
```

---

## 📦 Méthode 2 : Via AWS CLI (Sans EB CLI)

Si vous avez AWS CLI mais pas Python :

### Étape 1 : Créer le ZIP (comme ci-dessus)

### Étape 2 : Créer l'application avec AWS CLI

```bash
# Créer l'application
aws elasticbeanstalk create-application \
  --application-name decathlon-postural-health \
  --description "Decathlon Postural Health Backend"

# Créer l'environnement (plus complexe, nécessite un fichier de config)
```

**Cette méthode est plus complexe, la méthode Console est plus simple.**

---

## ✅ Avantages de la Méthode Console

- ✅ Pas besoin d'installer Python
- ✅ Pas besoin d'installer EB CLI
- ✅ Interface graphique simple
- ✅ Visualisation en temps réel
- ✅ Logs accessibles directement

---

## 🔄 Mettre à jour le Backend (Après modifications)

### Via Console :

1. Créer un nouveau ZIP avec les modifications
2. Dans Elastic Beanstalk → Votre environnement
3. **"Upload and deploy"**
4. Sélectionner le nouveau ZIP
5. Cliquer sur **"Deploy"**

---

## 📝 Checklist

- [ ] ZIP du backend créé (sans node_modules)
- [ ] Application créée dans AWS Console
- [ ] Environnement créé et déployé
- [ ] URL obtenue
- [ ] Variables d'environnement configurées
- [ ] Test `/api/health` fonctionne

---

## 🎯 Après le Déploiement

1. **Copier l'URL** du backend depuis la console

2. **Mettre à jour Amplify** :
   - AWS Amplify Console → Votre app
   - App settings → Environment variables
   - Ajouter : `VITE_API_URL = http://votre-url.elasticbeanstalk.com`

3. **C'est tout !** 🎉

---

**Cette méthode est plus simple si vous ne voulez pas installer Python !** 🚀

