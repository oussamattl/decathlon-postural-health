# 🔧 Fix du Déploiement Railway

## Problème Identifié

Le déploiement échoue à l'étape **"Pre-deploy command"**. Railway essaie probablement d'exécuter une commande qui n'existe pas ou qui échoue.

## Solutions

### Solution 1 : Désactiver la Pre-deploy Command (Recommandé)

1. **Dans Railway Dashboard :**
   - Aller dans votre service "decathlon-postural-health"
   - Cliquer sur "Settings"
   - Chercher "Pre-deploy Command" ou "Deploy Command"
   - **Laisser vide** ou supprimer toute commande
   - Sauvegarder

### Solution 2 : Vérifier la Configuration

Railway devrait automatiquement :
- Détecter Node.js
- Exécuter `npm install`
- Exécuter `npm start` ou le Procfile

Le **Procfile** est déjà configuré avec : `web: node server.js`

### Solution 3 : Vérifier le Port

Le serveur doit écouter sur le port fourni par Railway via `process.env.PORT`.

Le code actuel est correct : `const PORT = process.env.PORT || 3001;`

## Actions à Faire MAINTENANT

1. **Dans Railway Dashboard :**
   - Aller dans Settings de votre service
   - Vérifier "Start Command" : devrait être `node server.js`
   - Vérifier "Pre-deploy Command" : **devrait être VIDE**
   - Sauvegarder

2. **Vérifier les Variables d'Environnement :**
   - Ajouter si nécessaire :
     - `NODE_ENV` = `production`
     - `PORT` sera automatiquement fourni par Railway

3. **Redéployer :**
   - Dans la section "Deployments"
   - Cliquer sur les 3 points (...) du dernier déploiement
   - Choisir "Redeploy"

## Configuration Alternative

Si ça ne marche toujours pas, créer un `package.json` avec un script de démarrage explicite :

```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

(Ça existe déjà dans votre package.json ✅)

## Vérification

Une fois redéployé, vérifier :
- Les logs dans Railway (section "Logs")
- Que le service démarre sans erreur
- Tester : `https://votre-url.railway.app/api/health`

