const MongoClient = require('mongodb').MongoClient;
import nextConnect from 'next-connect';

const { MONGODB_URI, MONGODB_DB } = process.env

const uri =MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db(MONGODB_DB).collection("daily");
  // perform actions on the collection object

});

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db(MONGODB_DB );
  
  return next();
}

const middleware = nextConnect(); 

middleware.use(database);

export default middleware;