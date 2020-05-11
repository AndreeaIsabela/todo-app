import defaultState from './defaultState';
import { connectDB } from './connect-db';

async function initializeDb() {
  try {
    const { db, client } = await connectDB();

    for (let [key, value] of Object.entries(defaultState)) {
      const collection = db.collection(key);
      await collection.insertMany(value);
    }
    client.close();
  } catch (error) {
    console.log(error);
  }
}
initializeDb();
