// Base de données mockée des exercices et produits Decathlon

const EXERCISES_DATABASE = [
  // Exercices pour travail de bureau / dos
  {
    id: 'ex-1',
    title: 'Étirement du dos en extension',
    description: 'Asseyez-vous au bord de votre chaise, placez vos mains sur les hanches. Penchez-vous légèrement en arrière en arquant le dos. Maintenez la position 15-20 secondes. Répétez 3 fois. Cet exercice aide à contrebalancer la position courbée du bureau.',
    imageUrl: 'https://images.unsplash.com/photo-1544367563-12123d8965bf?auto=format&fit=crop&w=800&q=80',
    targetZones: ['Dos'],
    workTypes: ['Assis bureau'],
    products: [
      {
        id: 'prod-1',
        name: 'Tapis de Yoga Decathlon',
        description: 'Tapis antidérapant pour vos exercices au sol',
        price: '19.99€',
        imageUrl: 'https://placehold.co/200x200/0082C3/FFFFFF?text=Tapis+Yoga',
        searchTerm: 'tapis yoga'
      }
    ]
  },
  {
    id: 'ex-2',
    title: 'Rotation des épaules',
    description: 'Debout ou assis, levez les bras à l\'horizontale. Effectuez de larges cercles avec les bras, d\'abord vers l\'avant (10 fois), puis vers l\'arrière (10 fois). Cet exercice libère les tensions des épaules et du cou.',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    targetZones: ['Épaules'],
    workTypes: ['Assis bureau'],
    products: [
      {
        id: 'prod-2',
        name: 'Élastique de résistance Decathlon',
        description: 'Élastique pour renforcement musculaire',
        price: '9.99€',
        imageUrl: 'https://placehold.co/200x200/0082C3/FFFFFF?text=Élastique',
        searchTerm: 'elastique resistance'
      }
    ]
  },
  {
    id: 'ex-3',
    title: 'Planche abdominale',
    description: 'En position allongée sur le ventre, appuyez-vous sur les avant-bras et les orteils. Gardez le corps droit comme une planche. Maintenez 30 secondes à 1 minute selon votre niveau. Répétez 3 fois. Renforce le gainage et protège le dos.',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
    targetZones: ['Dos'],
    workTypes: ['Assis bureau', 'Mixte'],
    products: [
      {
        id: 'prod-1',
        name: 'Tapis de Yoga Decathlon',
        description: 'Tapis antidérapant pour vos exercices au sol',
        price: '19.99€',
        imageUrl: 'https://placehold.co/200x200/0082C3/FFFFFF?text=Tapis+Yoga',
        searchTerm: 'tapis yoga'
      }
    ]
  },
  // Exercices pour genoux
  {
    id: 'ex-4',
    title: 'Renforcement des quadriceps',
    description: 'Assis sur une chaise, levez une jambe jusqu\'à ce qu\'elle soit parallèle au sol. Maintenez 5 secondes, puis redescendez lentement. Faites 3 séries de 10 répétitions par jambe. Renforce les muscles autour du genou.',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
    targetZones: ['Genoux'],
    workTypes: ['Assis bureau', 'Physique', 'Mixte'],
    products: [
      {
        id: 'prod-3',
        name: 'Chaussures de sport Decathlon',
        description: 'Chaussures avec bon amorti pour protéger les genoux',
        price: '49.99€',
        imageUrl: 'https://placehold.co/200x200/0082C3/FFFFFF?text=Chaussures',
        searchTerm: 'chaussures sport'
      }
    ]
  },
  {
    id: 'ex-5',
    title: 'Étirement des ischio-jambiers',
    description: 'Assis au sol, une jambe tendue devant vous, l\'autre pliée. Penchez-vous vers l\'avant en gardant le dos droit jusqu\'à sentir l\'étirement à l\'arrière de la cuisse. Maintenez 30 secondes. Répétez 3 fois par jambe.',
    imageUrl: 'https://images.unsplash.com/photo-1544367563-12123d8965bf?auto=format&fit=crop&w=800&q=80',
    targetZones: ['Genoux'],
    workTypes: ['Assis bureau', 'Physique', 'Mixte'],
    products: [
      {
        id: 'prod-1',
        name: 'Tapis de Yoga Decathlon',
        description: 'Tapis antidérapant pour vos exercices au sol',
        price: '19.99€',
        imageUrl: 'https://placehold.co/200x200/0082C3/FFFFFF?text=Tapis+Yoga',
        searchTerm: 'tapis yoga'
      }
    ]
  },
  // Exercices pour travail physique
  {
    id: 'ex-6',
    title: 'Étirement du dos en flexion',
    description: 'À quatre pattes, asseyez-vous sur vos talons en gardant les bras tendus devant vous. Maintenez la position 20 secondes. Répétez 3 fois. Excellent pour détendre le dos après un travail physique.',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    targetZones: ['Dos'],
    workTypes: ['Physique', 'Mixte'],
    products: [
      {
        id: 'prod-4',
        name: 'Rouleau de massage Decathlon',
        description: 'Rouleau pour automassage et récupération',
        price: '14.99€',
        imageUrl: 'https://placehold.co/200x200/0082C3/FFFFFF?text=Rouleau',
        searchTerm: 'rouleau massage'
      }
    ]
  },
  {
    id: 'ex-7',
    title: 'Renforcement des épaules avec élastique',
    description: 'Tenez un élastique devant vous à hauteur de poitrine. Écartez les bras sur les côtés en résistant à l\'élastique. Revenez lentement. Faites 3 séries de 12 répétitions. Renforce les muscles stabilisateurs des épaules.',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
    targetZones: ['Épaules'],
    workTypes: ['Physique', 'Mixte'],
    products: [
      {
        id: 'prod-2',
        name: 'Élastique de résistance Decathlon',
        description: 'Élastique pour renforcement musculaire',
        price: '9.99€',
        imageUrl: 'https://placehold.co/200x200/0082C3/FFFFFF?text=Élastique',
        searchTerm: 'elastique resistance'
      }
    ]
  }
];

/**
 * Algorithme de recommandation basé sur les réponses du QCM
 */
export function getRecommendations(answers) {
  const { workType, painZone, sportLevel, age, gender } = answers;
  
  // Filtre les exercices selon le type de travail et la zone de douleur
  let filteredExercises = EXERCISES_DATABASE.filter(exercise => {
    const matchesWorkType = exercise.workTypes.includes(workType);
    const matchesPainZone = exercise.targetZones.includes(painZone);
    return matchesWorkType && matchesPainZone;
  });
  
  // Si pas assez d'exercices, on ajoute des exercices génériques pour la zone de douleur
  if (filteredExercises.length < 3) {
    const painZoneExercises = EXERCISES_DATABASE.filter(ex => 
      ex.targetZones.includes(painZone) && !filteredExercises.includes(ex)
    );
    filteredExercises = [...filteredExercises, ...painZoneExercises].slice(0, 3);
  }
  
  // Si toujours pas assez, on complète avec des exercices généraux
  if (filteredExercises.length < 3) {
    const generalExercises = EXERCISES_DATABASE.filter(ex => 
      !filteredExercises.includes(ex)
    );
    filteredExercises = [...filteredExercises, ...generalExercises].slice(0, 3);
  }
  
  // Retourne les 3 premiers exercices avec leurs produits associés
  return filteredExercises.slice(0, 3).map(exercise => ({
    id: exercise.id,
    title: exercise.title,
    description: exercise.description,
    imageUrl: exercise.imageUrl,
    products: exercise.products
  }));
}

