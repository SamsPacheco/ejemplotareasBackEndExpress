import { MongoClient } from 'mongodb';
const connectionString = process.env.ATLAS_URI;
const mongoURL = process.env.MONGO_URL || connectionString

const client = new MongoClient(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

export function connectToServer(callback) {
  client.connect(function (err, db) {
    if (err || !db) {
      return callback(err);
    }

    dbConnection = db.db('ejemplo');
    console.log('Successfully connected to MongoDB.');

    return callback();
  });
}
// /**
//  * Retrieves the database connection.
//  * @returns {DbConnection} The database connection.
//  */
export function getDb() {
  return dbConnection;
}
// export default dbConnection
