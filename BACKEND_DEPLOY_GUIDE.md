# 🚀 Guide Pas-à-Pas : Déploiement Backend AWS Elastic Beanstalk

Guide détaillé pour déployer le backend sans blocage.

---

## 📋 Prérequis

### 1. Installer AWS CLI

**Windows :**
```bash
# Télécharger et installer depuis :
# https://awscli.amazonaws.com/AWSCLIV2.msi
```

**Mac :**
```bash
brew install awscli
```

**Linux :**
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### 2. Configurer AWS CLI

```bash
aws configure
```

Vous aurez besoin de :
- **AWS Access Key ID** : Trouvable dans AWS Console → IAM → Security credentials
- **AWS Secret Access Key** : Créer une nouvelle clé si vous n'en avez pas
- **Default region** : `eu-west-3` (Paris) ou `eu-west-1` (Irlande)
- **Default output format** : `json`

### 3. Installer EB CLI

**Windows :**
```bash
pip install awsebcli
```

**Mac/Linux :**
```bash
pip3 install awsebcli --user
```

**Vérifier l'installation :**
```bash
eb --version
```

---

## 🎯 Déploiement du Backend

### Étape 1 : Aller dans le dossier backend

```bash
cd backend
```

### Étape 2 : Initialiser Elastic Beanstalk (Première fois)

```bash
eb init
```

**Réponses aux questions :**

1. **Select a region :**
   ```
   eu-west-3) Europe (Paris)
   ```
   (Choisissez la région la plus proche)

2. **Select an application to use :**
   ```
   [ Create new application ]
   ```

3. **Enter Application Name :**
   ```
   decathlon-postural-health
   ```
   (Appuyez sur Entrée pour accepter)

4. **It appears you are using Node.js. Is this correct?**
   ```
   (Y/n): Y
   ```

5. **Select a platform branch :**
   ```
   Node.js 18 running on 64bit Amazon Linux 2023
   ```
   (Choisissez Node.js 18)

6. **Set up SSH?**
   ```
   (Y/n): n
   ```
   (Pas nécessaire pour un simple déploiement)

✅ **Initialisation terminée !**

### Étape 3 : Créer l'environnement

```bash
eb create decathlon-backend
```

**Réponses aux questions :**

1. **Enter Environment Name :**
   ```
   decathlon-backend
   ```
   (Appuyez sur Entrée)

2. **Enter DNS CNAME prefix :**
   ```
   decathlon-backend
   ```
   (Appuyez sur Entrée)

3. **Select a load balancer type :**
   ```
   1) application
   ```
   (Choisissez 1)

⏱️ **Attendez 5-10 minutes** pendant la création de l'environnement.

### Étape 4 : Obtenir l'URL du backend

Une fois la création terminée :

```bash
eb status
```

**Cherchez la ligne "CNAME"** :
```
CNAME: decathlon-backend.XXXXX.elasticbeanstalk.com
```

**Copiez cette URL** ! Vous en aurez besoin pour le frontend.

### Étape 5 : Configurer les variables d'environnement

```bash
eb setenv NODE_ENV=production
```

### Étape 6 : Vérifier que ça fonctionne

```bash
# Ouvrir dans le navigateur
eb open

# Ou tester avec curl
curl http://decathlon-backend.XXXXX.elasticbeanstalk.com/api/health
```

Vous devriez voir :
```json
{"status":"OK","message":"Decathlon Postural Health API is running"}
```

---

## 🔧 Problèmes Courants et Solutions

### ❌ Erreur : "eb: command not found"

**Solution :**
```bash
# Vérifier l'installation
pip list | grep awsebcli

# Si pas installé
pip install awsebcli

# Ajouter au PATH (Mac/Linux)
export PATH=$PATH:~/.local/bin
```

### ❌ Erreur : "Unable to locate credentials"

**Solution :**
```bash
# Reconfigurer AWS CLI
aws configure

# Vérifier les credentials
aws sts get-caller-identity
```

### ❌ Erreur : "Access Denied" ou permissions

**Solution :**
1. Aller dans AWS Console → IAM
2. Créer un utilisateur avec ces permissions :
   - `AWSElasticBeanstalkFullAccess`
   - `IAMFullAccess` (temporairement pour la création)
3. Créer une Access Key
4. Reconfigurer : `aws configure`

### ❌ Erreur lors de `eb create` : "Environment already exists"

**Solution :**
```bash
# Lister les environnements existants
eb list

# Utiliser l'environnement existant
eb use decathlon-backend

# Ou le supprimer et recréer
eb terminate decathlon-backend
eb create decathlon-backend
```

### ❌ Le serveur ne démarre pas

**Vérifier les logs :**
```bash
eb logs
```

**Vérifier que le serveur écoute sur le bon port :**
- Elastic Beanstalk utilise automatiquement le port fourni par `process.env.PORT`
- Le code actuel est déjà configuré pour ça ✅

### ❌ Erreur CORS après déploiement

**Configurer FRONTEND_URL :**
```bash
eb setenv FRONTEND_URL=https://votre-app.amplifyapp.com
eb deploy
```

---

## 📝 Commandes Utiles

### Voir les logs en temps réel
```bash
eb logs --stream
```

### Redéployer après modification
```bash
eb deploy
```

### Voir le statut
```bash
eb status
```

### Ouvrir dans le navigateur
```bash
eb open
```

### Voir tous les environnements
```bash
eb list
```

### Arrêter l'environnement (pour économiser)
```bash
eb terminate decathlon-backend
```

---

## 🎯 Checklist de Déploiement

- [ ] AWS CLI installé et configuré
- [ ] EB CLI installé (`eb --version` fonctionne)
- [ ] Dans le dossier `backend`
- [ ] `eb init` terminé avec succès
- [ ] `eb create` terminé avec succès
- [ ] URL du backend copiée
- [ ] Test `/api/health` fonctionne
- [ ] Variable `NODE_ENV=production` configurée

---

## ✅ Une Fois le Backend Déployé

1. **Copier l'URL du backend** : `http://decathlon-backend.XXXXX.elasticbeanstalk.com`

2. **Mettre à jour le frontend** :
   - Aller dans AWS Amplify Console
   - App settings → Environment variables
   - Ajouter : `VITE_API_URL = http://decathlon-backend.XXXXX.elasticbeanstalk.com`
   - Redéployer le frontend

3. **Configurer CORS dans le backend** :
   ```bash
   eb setenv FRONTEND_URL=https://votre-app.amplifyapp.com
   eb deploy
   ```

---

## 🆘 Besoin d'Aide ?

Si vous êtes bloqué à une étape précise :

1. **Copiez l'erreur exacte** que vous voyez
2. **Vérifiez les logs** : `eb logs`
3. **Vérifiez le statut** : `eb status`
4. **Consultez** la section "Problèmes Courants" ci-dessus

---

**Vous devriez maintenant pouvoir déployer le backend ! 🚀**

