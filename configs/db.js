const { MongoClient } = require('mongodb')

let dbConnection

module.exports = {
    connectToDB: (cb) => {
        MongoClient.connect('mongodb+srv://adotepetDB:oVj9vFCFHfzZ415m@cluster0.nzvrv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        .then((client) => {
            dbConnection = client.db()
            return cb()
        })
        .catch (err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbConnection
}