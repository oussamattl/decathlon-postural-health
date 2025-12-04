import { motion } from 'framer-motion'
import { ExternalLink, ShoppingBag } from 'lucide-react'

const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-lg p-4 border border-gray-200 hover:border-decathlon-blue hover:shadow-md transition-all duration-200"
    >
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-16 h-16 rounded-lg object-cover border border-gray-200"
            onError={(e) => {
              e.target.src = `https://placehold.co/80x80/0082C3/FFFFFF?text=Produit`
            }}
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0 flex flex-col">
          <h5 className="font-semibold text-gray-800 mb-1 truncate text-sm">
            {product.name}
          </h5>
          <p className="text-xs text-gray-600 mb-3 line-clamp-2 flex-grow">
            {product.description}
          </p>
          
          {/* Price & Button Row */}
          <div className="flex items-center justify-between gap-3 mt-auto">
            <span className="text-lg font-bold text-decathlon-blue whitespace-nowrap">
              {product.price}
            </span>
            <motion.a
              href={`https://www.decathlon.fr/search?Ntt=${encodeURIComponent(product.searchTerm || 'sport')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 border-2 border-decathlon-blue text-decathlon-blue px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-decathlon-blue hover:text-white transition-all duration-200 whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Voir l'offre
              <ExternalLink className="w-3 h-3" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
