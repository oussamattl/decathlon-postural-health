# 🚀 Déploiement Backend - Guide Ultra Simple

Guide pas-à-pas pour déployer le backend sur AWS Elastic Beanstalk.

---

## ⚡ Méthode Rapide (5 minutes)

### Étape 1 : Ouvrir PowerShell/Terminal

Ouvrez votre terminal dans le dossier du projet.

### Étape 2 : Installer les outils nécessaires

#### A. Installer AWS CLI

**Windows :**
1. Téléchargez : https://awscli.amazonaws.com/AWSCLIV2.msi
2. Installez le fichier .msi
3. Redémarrez votre terminal

**Vérifier :**
```bash
aws --version
```

#### B. Installer EB CLI

```bash
pip install awsebcli
```

**Vérifier :**
```bash
eb --version
```

### Étape 3 : Configurer AWS (Première fois seulement)

```bash
aws configure
```

**Vous aurez besoin de :**
1. **AWS Access Key ID** : 
   - Allez sur https://console.aws.amazon.com/
   - IAM → Users → Votre utilisateur → Security credentials
   - "Create access key" → Copier la clé

2. **AWS Secret Access Key** : 
   - Copier la clé secrète (affichée une seule fois)

3. **Default region** : `eu-west-3` (Paris)

4. **Default output format** : `json`

### Étape 4 : Déployer le backend

```bash
# Aller dans le dossier backend
cd backend

# Initialiser (première fois seulement)
eb init
```

**Questions et réponses :**

```
Select a region: 12 (eu-west-3 - Europe Paris)
Select an application to use: [ Create new application ]
Enter Application Name: decathlon-postural-health
It appears you are using Node.js. Is this correct?: Y
Select a platform branch: Node.js 18 running on 64bit Amazon Linux 2023
Do you want to set up SSH for your instances?: n
```

**Créer l'environnement :**

```bash
eb create decathlon-backend
```

⏱️ **Attendez 5-10 minutes** (création de l'infrastructure AWS)

### Étape 5 : Obtenir l'URL

```bash
eb status
```

**Cherchez "CNAME"** dans la sortie, par exemple :
```
CNAME: decathlon-backend.xxxxx.eu-west-3.elasticbeanstalk.com
```

**Copiez cette URL complète !**

### Étape 6 : Tester

Ouvrez dans votre navigateur :
```
http://decathlon-backend.xxxxx.eu-west-3.elasticbeanstalk.com/api/health
```

Vous devriez voir :
```json
{"status":"OK","message":"Decathlon Postural Health API is running"}
```

---

## 🔧 Si ça ne marche pas

### Problème : "eb: command not found"

**Solution :**
```bash
# Vérifier que pip est installé
pip --version

# Si pas installé, installer Python depuis python.org

# Installer EB CLI
pip install awsebcli

# Ajouter au PATH (Windows)
# Chercher "Variables d'environnement" dans Windows
# Ajouter : C:\Users\VotreNom\AppData\Local\Programs\Python\PythonXX\Scripts
```

### Problème : "Unable to locate credentials"

**Solution :**
```bash
# Reconfigurer AWS
aws configure

# Vérifier que ça marche
aws sts get-caller-identity
```

### Problème : "Access Denied" ou permissions

**Solution :**
1. Aller sur AWS Console → IAM
2. Créer un utilisateur avec ces politiques :
   - `AWSElasticBeanstalkFullAccess`
3. Créer une Access Key
4. Reconfigurer : `aws configure`

### Problème : Erreur lors de `eb create`

**Vérifier les logs :**
```bash
eb logs
```

**Vérifier le statut :**
```bash
eb status
```

---

## 📝 Commandes Utiles

### Après déploiement

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

## ✅ Checklist

- [ ] AWS CLI installé (`aws --version`)
- [ ] EB CLI installé (`eb --version`)
- [ ] AWS configuré (`aws configure`)
- [ ] Dans le dossier `backend`
- [ ] `eb init` terminé
- [ ] `eb create` terminé (attendu 5-10 min)
- [ ] URL copiée depuis `eb status`
- [ ] Test `/api/health` fonctionne

---

## 🎯 Après le Déploiement

1. **Copier l'URL du backend** depuis `eb status`

2. **Mettre à jour le frontend Amplify** :
   - AWS Amplify Console → Votre app
   - App settings → Environment variables
   - Ajouter : `VITE_API_URL = http://votre-url.elasticbeanstalk.com`
   - Redéployer

3. **C'est tout !** 🎉

---

**Besoin d'aide sur une étape précise ? Dites-moi où vous êtes bloqué !**

