import './configs/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import animalRoutes from './routes/animalRoutes.js';
import http from 'http';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// init app & middleware
const app = express()

// Criação do server
const server = http.createServer(app)

// Origens permitidas
const allowedOrigins = process.env.URL_CORS.split(',');

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

// Criação do WebSocket Server
const wss = new WebSocketServer({ server, path: '/api/chat' });

// Lista de conexões e manipulação de eventos
wss.on('connection', (ws, req) => {
  console.log('Novo cliente conectado');

  // Registro de mensagens recebidas
  ws.on('message', (data) => {
    try {
      console.log(data)
      const dataMessage = JSON.parse(data);
      console.log(dataMessage)
      switch (dataMessage.action) {
        case 'register_user':
          ws.userId = dataMessage.idEmissor;
          console.log(`Usuário ${dataMessage.idEmissor} registrado.`);
          break;

        case 'send_message':
          const { idEmissor, idReceptor, emissor, message } = dataMessage;

          // Envia a mensagem para o cliente específico
          wss.clients.forEach((client) => {
            if (client.userId === idReceptor && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                text: message,
                emissor: idEmissor,
                emissorData: emissor
              }));
            }
          });
          console.log(`Mensagem enviada de ${idEmissor} para ${idReceptor}: ${message}`);
          break;

        default:
          console.log('Ação desconhecida:', dataMessage.action);
      }
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
    }
  });

  // Evento de desconexão
  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
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