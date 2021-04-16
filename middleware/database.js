const MongoClient = require('mongodb').MongoClient;
import nextConnect from 'next-connect';

const { MONGODB_URI, MONGODB_DB } = process.env

const uri = "mongodb+srv://123321:123321@gql-owais.ntqz7.mongodb.net/MCT?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db("MCT").collection("daily");
  // perform actions on the collection object

});

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db('MCT');
  
  return next();
}

const middleware = nextConnect(); 

middleware.use(database);

export default middleware;