import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft } from 'lucide-react'

const Quiz = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({
    gender: '',
    age: '',
    sportLevel: '',
    workType: '',
    painZone: ''
  })

  const questions = [
    {
      id: 'gender',
      label: 'Genre',
      type: 'select',
      options: [
        { value: 'Homme', label: 'Homme' },
        { value: 'Femme', label: 'Femme' },
        { value: 'Autre', label: 'Autre' }
      ]
    },
    {
      id: 'age',
      label: 'Âge',
      type: 'select',
      options: [
        { value: '18-25', label: '18-25 ans' },
        { value: '26-35', label: '26-35 ans' },
        { value: '36-45', label: '36-45 ans' },
        { value: '46-55', label: '46-55 ans' },
        { value: '56+', label: '56 ans et plus' }
      ]
    },
    {
      id: 'sportLevel',
      label: 'Niveau sportif',
      type: 'select',
      options: [
        { value: 'Débutant', label: 'Débutant' },
        { value: 'Intermédiaire', label: 'Intermédiaire' },
        { value: 'Expert', label: 'Expert' }
      ]
    },
    {
      id: 'workType',
      label: 'Type de travail',
      type: 'select',
      options: [
        { value: 'Assis bureau', label: 'Assis bureau' },
        { value: 'Physique', label: 'Physique' },
        { value: 'Mixte', label: 'Mixte' }
      ]
    },
    {
      id: 'painZone',
      label: 'Zone de douleur fréquente',
      type: 'select',
      options: [
        { value: 'Dos', label: 'Dos' },
        { value: 'Genoux', label: 'Genoux' },
        { value: 'Épaules', label: 'Épaules' }
      ]
    }
  ]

  const handleAnswer = (value) => {
    const questionId = questions[currentStep].id
    setAnswers({ ...answers, [questionId]: value })
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
      const response = await fetch(`${apiUrl}/api/recommendations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(answers)
      })
      const data = await response.json()
      
      // Stocker les réponses et recommandations dans le localStorage
      localStorage.setItem('quizAnswers', JSON.stringify(answers))
      localStorage.setItem('recommendations', JSON.stringify(data.recommendations))
      
      navigate('/dashboard')
    } catch (error) {
      console.error('Erreur lors de la soumission:', error)
      alert('Erreur de connexion au serveur. Vérifiez que le backend est démarré.')
    }
  }

  const currentQuestion = questions[currentStep]
  const isAnswered = answers[currentQuestion.id] !== ''
  const progress = ((currentStep + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-decathlon-blue py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentStep + 1} sur {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="bg-decathlon-blue h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-xl shadow-xl p-8 mb-6"
        >
          <h2 className="text-3xl font-bold text-decathlon-blue mb-8">
            {currentQuestion.label}
          </h2>

          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                  answers[currentQuestion.id] === option.value
                    ? 'bg-decathlon-blue text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg font-medium">{option.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <motion.button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              currentStep === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-decathlon-blue hover:bg-gray-100 shadow-lg'
            }`}
            whileHover={currentStep > 0 ? { scale: 1.05 } : {}}
            whileTap={currentStep > 0 ? { scale: 0.95 } : {}}
          >
            <ArrowLeft className="w-5 h-5" />
            Précédent
          </motion.button>

          <motion.button
            onClick={handleNext}
            disabled={!isAnswered}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              isAnswered
                ? 'bg-decathlon-blue text-white hover:bg-blue-700 shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={isAnswered ? { scale: 1.05 } : {}}
            whileTap={isAnswered ? { scale: 0.95 } : {}}
          >
            {currentStep === questions.length - 1 ? 'Terminer' : 'Suivant'}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default Quiz

