import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import animalRoutes from './routes/animalRoutes.js';
import cors from 'cors';
import express from 'express';
import { connectToDB } from './configs/db.js';

// init app & middleware
const app = express();

// Middleware
app.use(express.json());

// Conexão com o banco de dados MongoDB
connectToDB((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err); // Log de erro
    return; // Não inicializa o servidor se houver um erro
  }
  console.log("Conexão com o banco de dados MongoDB estabelecida com sucesso."); // Log de sucesso
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://adotepet-six.vercel.app');
  res.header('Access-Control-Allow-Methods', 'DELETE, POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Max-Age', '86400');
  next();
});

// OPTIONS request
app.options('/*', (req, res) => {
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.send('API funcionando corretamente');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/animal', animalRoutes);

export default app;
