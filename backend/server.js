import express from 'express';
import cors from 'cors';
import { getRecommendations } from './data.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
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

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

