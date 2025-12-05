# 🚀 Déployer le Backend MAINTENANT - Guide Simple

## 📋 Prérequis (10 minutes)

### 1. Installer Python (pour pip)

**Windows :**
- Télécharger : https://www.python.org/downloads/
- ⚠️ **Important** : Cocher "Add Python to PATH" lors de l'installation
- Redémarrer votre terminal

**Vérifier :**
```bash
python --version
```

### 2. Installer AWS CLI

**Windows :**
- Télécharger : https://awscli.amazonaws.com/AWSCLIV2.msi
- Installer
- Redémarrer votre terminal

**Vérifier :**
```bash
aws --version
```

### 3. Installer EB CLI

```bash
pip install awsebcli
```

**Vérifier :**
```bash
eb --version
```

### 4. Configurer AWS (CRUCIAL !)

```bash
aws configure
```

**Besoin de créer des clés AWS ?**

1. Aller sur : https://console.aws.amazon.com/iam/
2. Cliquer sur "Users" → Votre nom d'utilisateur
3. Onglet "Security credentials"
4. "Create access key" → "Application running outside AWS"
5. **COPIER** les deux clés (Access Key ID et Secret)

**Ensuite dans le terminal :**
```
AWS Access Key ID: [coller votre clé]
AWS Secret Access Key: [coller votre clé secrète]
Default region name: eu-west-3
Default output format: json
```

---

## 🎯 Déploiement (5 minutes)

### Étape 1 : Ouvrir le terminal dans le dossier backend

```bash
cd backend
```

### Étape 2 : Initialiser Elastic Beanstalk

```bash
eb init
```

**Répondez aux questions ainsi :**

```
❓ Select a region:
   Choisir: 12 (ou le numéro pour eu-west-3 - Europe Paris)

❓ Select an application to use:
   Choisir: [Create new application] (première option)

❓ Enter Application Name:
   Taper: decathlon-postural-health
   Appuyer sur Entrée

❓ It appears you are using Node.js. Is this correct?
   Taper: Y (oui)

❓ Select a platform branch:
   Choisir: Node.js 18 running on 64bit Amazon Linux 2023

❓ Do you want to set up SSH for your instances?
   Taper: n (non)
```

✅ **Si vous voyez "Application decathlon-postural-health has been created", c'est bon !**

### Étape 3 : Créer l'environnement (ATTENDRE 5-10 minutes)

```bash
eb create decathlon-backend
```

**Répondez :**

```
❓ Enter Environment Name:
   Appuyer sur Entrée (défaut: decathlon-backend)

❓ Enter DNS CNAME prefix:
   Appuyer sur Entrée (défaut: decathlon-backend)

❓ Select a load balancer type:
   Taper: 1 (application)
```

⏱️ **ATTENDEZ 5-10 minutes** - Ne fermez pas le terminal !

Vous verrez :
```
Creating application version archive "app-xxxxx".
Uploading decathlon-postural-health/app-xxxxx.zip to S3...
```

**À la fin, vous verrez :**
```
✅ Successfully launched environment: decathlon-backend
```

### Étape 4 : Obtenir l'URL

```bash
eb status
```

**Cherchez la ligne "CNAME"** :
```
CNAME: decathlon-backend.xxxxx.eu-west-3.elasticbeanstalk.com
```

**COPIEZ cette URL complète !**

### Étape 5 : Tester

Ouvrez dans votre navigateur :
```
http://decathlon-backend.xxxxx.eu-west-3.elasticbeanstalk.com/api/health
```

**Vous devriez voir :**
```json
{"status":"OK","message":"Decathlon Postural Health API is running"}
```

🎉 **C'est bon, le backend est déployé !**

---

## 🔧 Si vous avez une erreur

### ❌ "eb: command not found"

```bash
# Vérifier Python
python --version

# Réinstaller EB CLI
pip install awsebcli

# Windows: Ajouter au PATH
# Chercher "Variables d'environnement" dans Windows
# Ajouter: C:\Users\VotreNom\AppData\Local\Programs\Python\PythonXX\Scripts
```

### ❌ "Unable to locate credentials"

```bash
# Reconfigurer AWS
aws configure

# Vérifier
aws sts get-caller-identity
```

### ❌ "Access Denied" ou "Permission denied"

1. Aller sur : https://console.aws.amazon.com/iam/
2. Créer un utilisateur avec la politique : `AWSElasticBeanstalkFullAccess`
3. Créer une Access Key
4. `aws configure` avec les nouvelles clés

### ❌ Erreur lors de `eb create`

**Voir les logs détaillés :**
```bash
eb logs
```

**Ou vérifier le statut :**
```bash
eb status
```

---

## ✅ Après le Déploiement

### 1. Copier l'URL du backend

Depuis `eb status`, copiez l'URL complète (CNAME).

### 2. Mettre à jour le Frontend Amplify

1. Aller sur : https://console.aws.amazon.com/amplify/
2. Sélectionner votre app
3. **App settings** (menu gauche) → **Environment variables**
4. Cliquer sur **"Manage variables"**
5. Ajouter :
   - **Key** : `VITE_API_URL`
   - **Value** : `http://votre-url.elasticbeanstalk.com`
6. **Save**
7. Redémarrer le build (si nécessaire)

### 3. Configurer CORS dans le backend

```bash
eb setenv FRONTEND_URL=https://votre-app.amplifyapp.com
eb deploy
```

---

## 📝 Commandes Utiles

```bash
# Voir les logs
eb logs

# Redéployer après modification
eb deploy

# Voir le statut
eb status

# Ouvrir dans le navigateur
eb open
```

---

## 🆘 Aide Immédiate

**Dites-moi à quelle étape vous êtes bloqué :**

- ❓ Installation des outils ?
- ❓ Configuration AWS (`aws configure`) ?
- ❓ `eb init` ?
- ❓ `eb create` ?
- ❓ Erreur spécifique ?

**Partagez l'erreur exacte et je vous aiderai !** 🚀

