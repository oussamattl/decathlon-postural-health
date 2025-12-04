import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, TrendingUp } from 'lucide-react'
import ExerciseCard from './ExerciseCard'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const Dashboard = () => {
  const navigate = useNavigate()
  const [recommendations, setRecommendations] = useState([])
  const [answers, setAnswers] = useState(null)
  const [healthScore, setHealthScore] = useState(0)
  const [radarData, setRadarData] = useState([])

  useEffect(() => {
    const storedRecommendations = localStorage.getItem('recommendations')
    const storedAnswers = localStorage.getItem('quizAnswers')

    if (storedRecommendations) {
      setRecommendations(JSON.parse(storedRecommendations))
    } else {
      navigate('/quiz')
    }

    if (storedAnswers) {
      const parsedAnswers = JSON.parse(storedAnswers)
      setAnswers(parsedAnswers)
      
      // Calcul du score santé basé sur les réponses
      const score = calculateHealthScore(parsedAnswers)
      setHealthScore(score)
      
      // Calcul des données du radar
      const radar = calculateRadarData(parsedAnswers)
      setRadarData(radar)
    }
  }, [navigate])

  // Calcul du score santé (0-100)
  const calculateHealthScore = (answers) => {
    let score = 50 // Base score
    
    // Bonus pour niveau sportif
    if (answers.sportLevel === 'Expert') score += 20
    else if (answers.sportLevel === 'Intermédiaire') score += 10
    
    // Bonus pour âge (jeune = plus de potentiel)
    if (answers.age === '18-25') score += 15
    else if (answers.age === '26-35') score += 10
    else if (answers.age === '36-45') score += 5
    
    // Malus pour type de travail (bureau = moins actif)
    if (answers.workType === 'Assis bureau') score -= 10
    else if (answers.workType === 'Physique') score += 10
    else if (answers.workType === 'Mixte') score += 5
    
    // Ajustement selon zone de douleur (présence = malus)
    score -= 15 // Présence d'une douleur réduit le score
    
    return Math.max(0, Math.min(100, Math.round(score)))
  }

  // Calcul des données pour le graphique radar
  const calculateRadarData = (answers) => {
    let souplesse = 60
    let force = 60
    let endurance = 60
    
    // Ajustements basés sur les réponses
    if (answers.sportLevel === 'Expert') {
      souplesse += 20
      force += 25
      endurance += 25
    } else if (answers.sportLevel === 'Intermédiaire') {
      souplesse += 10
      force += 15
      endurance += 15
    }
    
    if (answers.workType === 'Physique') {
      force += 15
      endurance += 20
    } else if (answers.workType === 'Assis bureau') {
      souplesse -= 10
      force -= 5
      endurance -= 10
    }
    
    // Ajustement selon la zone de douleur
    if (answers.painZone === 'Dos') {
      souplesse -= 15
    } else if (answers.painZone === 'Genoux') {
      force -= 10
      endurance -= 15
    } else if (answers.painZone === 'Épaules') {
      souplesse -= 10
      force -= 15
    }
    
    return [
      { subject: 'Souplesse', value: Math.max(0, Math.min(100, Math.round(souplesse))) },
      { subject: 'Force', value: Math.max(0, Math.min(100, Math.round(force))) },
      { subject: 'Endurance', value: Math.max(0, Math.min(100, Math.round(endurance))) }
    ]
  }

  // Données pour le graphique circulaire (score)
  const pieData = [
    { name: 'Score', value: healthScore, fill: '#0082C3' },
    { name: 'Restant', value: 100 - healthScore, fill: '#E5E7EB' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-blue-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Bon'
    if (score >= 40) return 'Moyen'
    return 'À améliorer'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-decathlon-blue py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-decathlon-blue hover:text-blue-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Retour à l'accueil</span>
          </button>

          <div className="bg-white rounded-xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <h1 className="text-4xl font-bold text-decathlon-blue">
                Bilan de Santé Posturale
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              Analyse complète de votre profil et recommandations personnalisées
            </p>
            {answers && (
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <span className="bg-blue-100 text-decathlon-blue px-3 py-1 rounded-full">
                  {answers.workType}
                </span>
                <span className="bg-blue-100 text-decathlon-blue px-3 py-1 rounded-full">
                  {answers.painZone}
                </span>
                <span className="bg-blue-100 text-decathlon-blue px-3 py-1 rounded-full">
                  {answers.sportLevel}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Health Score & Radar Chart Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Score Santé - Graphique circulaire */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-decathlon-blue" />
              <h2 className="text-2xl font-bold text-gray-800">Score Santé</h2>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                  >
                    <Cell key="score" fill="#0082C3" />
                    <Cell key="restant" fill="#E5E7EB" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              
              <div className="mt-4 text-center">
                <div className={`text-5xl font-bold ${getScoreColor(healthScore)} mb-2`}>
                  {healthScore}/100
                </div>
                <div className={`text-xl font-semibold ${getScoreColor(healthScore)}`}>
                  {getScoreLabel(healthScore)}
                </div>
                <p className="text-gray-600 mt-2 text-sm">
                  Votre score postural actuel
                </p>
              </div>
            </div>
          </motion.div>

          {/* Radar Chart - Profil */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Profil Physique
            </h2>
            
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#4B5563', fontSize: 12, fontWeight: 'bold' }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]}
                  tick={{ fill: '#9CA3AF', fontSize: 10 }}
                />
                <Radar
                  name="Votre profil"
                  dataKey="value"
                  stroke="#0082C3"
                  fill="#0082C3"
                  fillOpacity={0.6}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
            
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              {radarData.map((item, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-decathlon-blue">
                    {item.value}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {item.subject}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Exercises Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
            <h2 className="text-3xl font-bold text-decathlon-blue mb-2">
              Exercices Recommandés
            </h2>
            <p className="text-gray-600">
              Programme personnalisé adapté à votre profil
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.map((exercise, index) => (
              <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center text-gray-600"
        >
          <p className="text-sm">
            Ces recommandations sont à titre informatif. Consultez un professionnel de santé pour un diagnostic médical.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
