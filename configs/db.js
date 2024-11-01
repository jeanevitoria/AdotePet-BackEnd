import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

let dbConnection;
dotenv.config();

export const connectToDB = (cb) => {
    console.log(process.env.MONGODB_URI)

    MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 45000
      })
    .then((client) => {
        dbConnection = client.db('adotepetDB');
        return cb();
    })
    .catch(err => {
        console.log(err);
        return cb(err);
    });
};

export const getDb = () => dbConnection;
