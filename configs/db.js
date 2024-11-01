import { MongoClient } from 'mongodb';

let dbConnection;

export const connectToDB = async () => {
    return MongoClient.connect('mongodb+srv://adotepetDB:oVj9vFCFHfzZ415m@cluster0.nzvrv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        .then((client) => {
            dbConnection = client.db();
            console.log("Conectado ao MongoDB");
        })
        .catch(err => {
            console.error("Erro ao conectar ao MongoDB:", err);
            throw err;
        });
};

export const getDb = () => dbConnection;
