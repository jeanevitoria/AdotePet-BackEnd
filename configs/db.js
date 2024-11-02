import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

let dbConnection;
dotenv.config();

export const connectToDB = async (cb) => {
    console.log(process.env.MONGODB_URI);

    const client = await MongoClient.connect(process.env.MONGODB_URI)
    dbConnection = client.db();
    console.log('Conexão com o banco de dados MongoDB estabelecida com sucesso.');
    return cb();
};

export const getDb = () => {
    if (!dbConnection) {
        throw new Error('Banco de dados não conectado');
    }
    return dbConnection;
};