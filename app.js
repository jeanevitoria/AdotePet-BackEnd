import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import animalRoutes from './routes/animalRoutes.js';
import cors from 'cors';
import express from 'express';
import { connectToDB } from './configs/db.js';

// Inicializa a aplicação
const app = express();

// Middleware
app.use(express.json());

// Conexão com o banco de dados mongodb
connectToDB()
    .then(() => {
        // CORS para o frontend
        app.use(cors({
            origin: ['https://adotepet-six.vercel.app', 'http://localhost:5174'],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }));

        app.get('/', (req, res) => {
            res.send('API funcionando corretamente');
        });

        // Rotas
        app.use('/api/auth', authRoutes);
        app.use('/api/user', userRoutes);
        app.use('/api/chat', chatRoutes);
        app.use('/api/animal', animalRoutes);
    })
    .catch(err => {
        console.error("Erro ao conectar ao banco de dados:", err);
        process.exit(1); // Sai do processo se a conexão falhar
    });

export default app;
