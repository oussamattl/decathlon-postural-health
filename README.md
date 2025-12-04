C'est une excellente base \! Pour le rendre "humain", attrayant et parfait pour un portfolio GitHub, il faut :

1.  **Raconter une histoire** (pas juste lister des fonctionnalités).
2.  **Utiliser des badges** pour la stack technique (ça fait très pro).
3.  **Ajouter des visuels** (je vais mettre des emplacements pour tes screenshots).
4.  **Soigner la mise en forme** pour que ce soit lisible en un coup d'œil.

Voici une version remaniée, prête à être copiée-collée.

-----

# 🏆 Decathlon Postural Health

[](https://www.google.com/search?q=https://www.decathlon.digital/)
[](https://reactjs.org/)
[](https://vitejs.dev/)
[](https://tailwindcss.com/)
[](https://nodejs.org/)

> **Et si le code nous aidait à mieux bouger ?**
> Une application web qui connecte l'informatique au sport pour prévenir les troubles musculo-squelettiques (TMS) liés au travail.

-----

## 📸 Aperçu

-----

## 💡 Le Concept

Développé dans le cadre du **Hackathon Decathlon Digital**, ce projet répond à une problématique simple : **la sédentarité**.

**Decathlon Postural Health** n'est pas juste un QCM. C'est un coach digital intelligent qui :

1.  **Analyse** votre profil (âge, type de métier, zones de douleur).
2.  **Diagnostique** vos besoins posturaux.
3.  **Recommande** des exercices ciblés et le matériel adéquat pour aller mieux.

## ✨ Fonctionnalités Clés

### 🧠 Profilage Intelligent

Un formulaire interactif et fluide (animations Framer Motion) pour comprendre l'utilisateur :

  * Genre & Âge
  * Niveau sportif
  * Contexte de travail (Bureau, Physique, Mixte)
  * Zones de douleurs (Dos, Épaules, Genoux...)

### 🩺 Dashboard Santé Sur-Mesure

Fini les conseils génériques. L'algorithme génère un tableau de bord unique avec :

  * **3 exercices correctifs** spécifiques à vos douleurs.
  * Des instructions visuelles et textuelles claires.

### 🛍️ Écosystème Connecté

L'application fait le pont entre le besoin de santé et l'équipement. Chaque exercice est intelligemment lié à un produit Decathlon pertinent (tapis, élastique, etc.) avec un accès direct au store.

-----

## 🛠️ La Stack Technique

Nous avons choisi une stack moderne pour garantir rapidité, fluidité et maintenabilité.

| Domaine | Technologies | Pourquoi ce choix ? |
| :--- | :--- | :--- |
| **Frontend** | **React 18 + Vite** | Performance de build instantanée et expérience développeur optimale. |
| **UI/UX** | **Tailwind CSS** | Développement rapide d'une interface responsive et conforme à la charte Decathlon. |
| **Animations** | **Framer Motion** | Pour donner vie à l'interface et rendre le questionnaire ludique. |
| **Backend** | **Node.js + Express** | API REST légère pour gérer la logique de recommandation. |
| **Icônes** | **Lucide React** | Un set d'icônes moderne et cohérent. |

-----

## 🚀 Installation & Démarrage

Envie de tester le projet en local ? Suivez le guide \!

### Prérequis

  * Node.js (v18+)
  * npm ou yarn

### 1\. Clonage et Installation

```bash
git clone https://github.com/VOTRE_USERNAME/decathlon-postural-health.git
cd decathlon-postural-health

# La commande magique pour tout installer d'un coup
npm run install:all
```

### 2\. Lancement

Nous avons besoin de deux terminaux (un pour l'API, un pour le Front).

**Terminal 1 (Backend) :**

```bash
cd backend
npm start
# 🟢 API prête sur http://localhost:3001
```

**Terminal 2 (Frontend) :**

```bash
cd frontend
npm run dev
# 🔵 App prête sur http://localhost:3000
```

Ouvrez votre navigateur sur `http://localhost:3000` et bougez \! 🏃‍♂️

-----

## 🧠 Sous le capot : L'Algorithme

La magie opère dans le backend. Notre moteur de recommandation croise les données :

  * **Input :** `Assis bureau` + `Douleur Dos`
  * **Processing :** Filtre la base de données d'exercices pour exclure les mouvements à impact et privilégier les étirements lombaires.
  * **Output :** JSON contenant les exercices + les produits associés (ex: "Rouleau de massage").

Exemple de réponse API :

```json
{
  "success": true,
  "recommendations": [
    {
      "title": "Étirement du dos en extension",
      "painZone": "Dos",
      "products": ["Tapis de sol confort 10mm"]
    }
  ]
}
```

-----

## 📁 Structure du Projet

```bash
decathlon-postural-health/
├── 📂 backend/         # API & Logique métier
│   ├── server.js       # Point d'entrée Express
│   └── data.js         # "Base de données" (Exercices & Produits)
├── 📂 frontend/        # Interface Utilisateur
│   ├── src/
│   │   ├── components/ # Composants réutilisables (Cards, Quiz...)
│   │   └── pages/      # Landing, Dashboard...
└── README.md
```


