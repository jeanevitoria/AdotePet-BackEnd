import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import chatRoutes from './routes/chatRoutes';
import animalRoutes from './routes/animalRoutes';
const express = require('express')
import { connectToDB } from './configs/db';

// init app & middleware
const app = express()

// Middleware
app.use(express.json());

// conexão com o banco de dados mongodb
connectToDB(() => {
  if (!err) {
    // Inicialização do servidor quando a conexão com o db é bem-sucedida
    app.listen(3000, () => { console.log("Servidor ouvindo na porta 3000.") })
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