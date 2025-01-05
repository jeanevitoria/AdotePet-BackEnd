import './configs/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import animalRoutes from './routes/animalRoutes.js';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// init app & middleware
const app = express()

// Criação do server
const server = http.createServer(app)

// Origens permitidas
const allowedOrigins = process.env.URL_CORS.split(',');

// Criação do server do Socket.io
export const io = new Server(server, {
  cors: {

    origin: (origin, callback) => {
      // Verifica se a origem está na lista de URLs permitidas
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Permite a origem
      } else {
        callback(new Error("Origem não permitida pelo CORS do Socket.IO"), false); // Bloqueia a origem
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    path: '/api/chat/socket.io'  // Definindo o caminho para o Socket.IO
  }
})

io.on("connection", (socket) => {
  // Quando o usuário se conecta, ele se registra em uma sala com o próprio _id
  socket.on("register_user", (userId) => {
    socket.join(userId); // O socket entra em uma room com o nome do _id
    console.log(`Usuário ${userId} conectado à sala ${userId}`);
  });

  // Enviar mensagem para um usuário específico
  socket.on("send_message", ({ idEmissor, idReceptor, message }) => {
    io.to(idReceptor).emit("receive_message", {
      from: idEmissor,
      to: idReceptor,
      message,
    }); // Envia a mensagem para a sala do _id especificado
  });

  // Lidar com desconexões
  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} desconectado.`);
  });
});


// Middleware
app.use(express.json());

// CORS para o frontend
app.use((req, res, next) => {

  // Verifica se a origem da requisição está na lista de URLs permitidas
  if (allowedOrigins.includes(req.headers.origin)) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
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

// Para rodar localmente
server.listen(3000, () => console.log('Servidor rodando na porta 3000.'))

// routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/animal', animalRoutes);

export default app;