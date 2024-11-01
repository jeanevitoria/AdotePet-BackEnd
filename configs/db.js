import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

let dbConnection;
dotenv.config();
console.log(process.env.MONGODB_URI)
export const connectToDB = (cb) => {
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
