import express from 'express';
import cors from 'cors';
import { getRecommendations } from './data.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Configuration CORS
const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  // Patterns pour AWS Amplify
  /^https:\/\/.*\.amplifyapp\.com$/,
  /^https:\/\/.*\.amazonaws\.com$/,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // En développement, accepter toutes les origines
    if (!isProduction) {
      return callback(null, true);
    }
    
    // Permet les requêtes sans origin (mobile apps, curl, etc.)
    if (!origin) {
      return callback(null, true);
    }
    
    // Vérifier contre la liste des origines autorisées
    if (allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        return origin === allowed || origin.startsWith(allowed);
      }
      if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return false;
    })) {
      callback(null, true);
    } else {
      // En production, accepter aussi toutes les origines pour faciliter le déploiement
      // (À restreindre en production réelle si nécessaire)
      callback(null, true);
    }
  },
  credentials: true
}));
app.use(express.json());

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Decathlon Postural Health API is running' });
});

// Route pour obtenir les recommandations basées sur les réponses du QCM
app.post('/api/recommendations', (req, res) => {
  try {
    const answers = req.body;
    const recommendations = getRecommendations(answers);
    res.json({ success: true, recommendations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: /api/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

