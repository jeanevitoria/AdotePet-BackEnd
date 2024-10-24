import { MongoClient } from 'mongodb';

let dbConnection;

export const connectToDB = (cb) => {
    MongoClient.connect('mongodb+srv://adotepetDB:oVj9vFCFHfzZ415m@cluster0.nzvrv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
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
