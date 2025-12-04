import { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Dumbbell, Zap } from 'lucide-react'
import ProductCard from './ProductCard'

const ExerciseCard = ({ exercise, index }) => {
  const [imageError, setImageError] = useState(false)
  const [imageUrl, setImageUrl] = useState(exercise.imageUrl || '')

  // Icône de fallback basée sur le type d'exercice
  const getFallbackIcon = () => {
    const title = exercise.title.toLowerCase()
    if (title.includes('planche') || title.includes('renforcement')) {
      return <Dumbbell className="w-16 h-16 text-decathlon-blue" />
    }
    if (title.includes('étirement') || title.includes('stretch')) {
      return <Activity className="w-16 h-16 text-decathlon-blue" />
    }
    return <Zap className="w-16 h-16 text-decathlon-blue" />
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Exercise Image */}
      <div className="w-full h-64 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
        {!imageError && imageUrl ? (
          <img
            src={imageUrl}
            alt={exercise.title}
            className="w-full h-full object-cover rounded-t-xl shadow-md"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              {getFallbackIcon()}
              <p className="mt-2 text-sm text-gray-600 font-medium">
                Exercice de santé
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Exercise Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-decathlon-blue mb-3">
          {exercise.title}
        </h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
          {exercise.description}
        </p>

        {/* Products Section */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase">
            Produits recommandés
          </h4>
          <div className="space-y-3">
            {exercise.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ExerciseCard

