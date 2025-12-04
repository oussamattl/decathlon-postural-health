import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Activity, Shield, TrendingUp } from 'lucide-react'

const LandingPage = () => {
  const navigate = useNavigate()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-decathlon-blue">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Logo / Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-decathlon-blue mb-4">
              Decathlon
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-2">
              Postural Health
            </h2>
            <p className="text-xl md:text-2xl text-gray-700">
              Prévenez les blessures grâce à l'intelligence artificielle
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Activity className="w-12 h-12 text-decathlon-blue mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Diagnostic Personnalisé</h3>
              <p className="text-gray-600">
                Répondez à quelques questions pour obtenir un diagnostic adapté
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Shield className="w-12 h-12 text-decathlon-blue mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Prévention Active</h3>
              <p className="text-gray-600">
                Découvrez des exercices ciblés pour prévenir les blessures
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <TrendingUp className="w-12 h-12 text-decathlon-blue mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Recommandations</h3>
              <p className="text-gray-600">
                Recevez des conseils adaptés à votre profil et votre activité
              </p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              onClick={() => navigate('/quiz')}
              className="bg-decathlon-blue text-white px-12 py-4 rounded-xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Commencer mon diagnostic
            </motion.button>
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-gray-600"
          >
            <p className="text-sm">
              Hackathon Decathlon Digital - Innovation pour la santé du sportif
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default LandingPage

