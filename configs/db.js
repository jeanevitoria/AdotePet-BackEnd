import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

let dbConnection;
dotenv.config();

export const connectToDB = (cb) => {
    console.log(process.env.MONGODB_URI)

    MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
        dbConnection = client.db();
        return cb();
    })
    .catch(err => {
        console.log(err);
        return cb(err);
    });
};

export const getDb = () => dbConnection;
