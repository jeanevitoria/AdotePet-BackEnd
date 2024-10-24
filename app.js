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

// conexão com o banco de dados mongodb
connectToDB((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return; // Não inicializa o servidor se houver um erro
  }
})

// CORS para o frontend
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

app.get('/', (req, res) => {
  res.send('API funcionando corretamente');
});


// routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/animal', animalRoutes);

export default app;