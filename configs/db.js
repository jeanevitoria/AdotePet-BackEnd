import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

let dbConnection;
dotenv.config();

const connectToDB = async (cb) => {
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    dbConnection = client.db();
    console.log('Conexão com o banco de dados MongoDB estabelecida com sucesso.');
    return cb();
};

// conexão com o banco de dados mongodb
await connectToDB((err) => {
    if (err) {
      console.error("Erro ao conectar ao banco de dados:", err);
      return; // Não inicializa o servidor se houver um erro
    } else {
      console.log("Conexão bem-sucedida")
    }
  })
  
export const getDb = () => {
    if (!dbConnection) {
        throw new Error('Banco de dados não conectado');
    }
    return dbConnection;
};