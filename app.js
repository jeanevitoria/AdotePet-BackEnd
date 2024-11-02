import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import animalRoutes from './routes/animalRoutes.js';
import cors from 'cors';
import express from 'express';
import { connectToDB } from './configs/db.js';

// init app & middleware
const app = express()

// Middleware
app.use(express.json());

// CORS para o frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://adotepet-six.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.get('/', (req, res) => {
  res.send('API funcionando corretamente');
});


// routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/animal', animalRoutes);

// conexão com o banco de dados mongodb
connectToDB((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return; // Não inicializa o servidor se houver um erro
  } else {
    console.log("Conexão bem-sucedida")
  }
})

export default app;