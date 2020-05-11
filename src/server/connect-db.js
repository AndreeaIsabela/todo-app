import { MongoClient } from 'mongodb';
const url = 'mongodb://localhost:27017';

const dbName = 'myorganizer';

export async function connectDB() {
  try {
    const client = await MongoClient.connect(url);
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    return { db, client };
  } catch (error) {
    console.log(error);
  }
}
// connectDB();
