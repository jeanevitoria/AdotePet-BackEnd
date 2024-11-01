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

// CORS para o frontend
app.use(cors({
  origin: (origin, callback) => {
    console.log('Origem da requisição:', origin); // Log da origem recebida
    if (origin === 'https://adotepet-six.vercel.app') {
      callback(null, true);
    } else {
      console.warn(`Acesso não permitido da origem: ${origin}`); // Log de advertência para acessos não permitidos
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

app.get('/', (req, res) => {
  res.send('API funcionando corretamente');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/animal', animalRoutes);

export default app;
