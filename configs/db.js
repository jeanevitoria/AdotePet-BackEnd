import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

let dbConnection;
dotenv.config();

export const connectToDB = (cb) => {
    console.log(process.env.MONGODB_URI);

    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            dbConnection = client.db();
            console.log('Conexão com o banco de dados MongoDB estabelecida com sucesso.');
            return cb();
        })
        .catch((err) => {
            console.error('Erro ao conectar ao banco de dados:', err);
            return cb(err);
        });
};

export const getDb = () => {
    if (!dbConnection) {
        throw new Error('Banco de dados não conectado');
    }
    return dbConnection;
};