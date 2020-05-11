import defaultState from './defaultState';
import { MongoClient } from 'mongodb';
import  assert from 'assert';

const url = 'mongodb://localhost:27017';

const dbName = 'myorganizer';

async function initializeDb() {
  await MongoClient.connect(url, async (err, client) => {
    assert.equal(null, err);
    console.log('Connected successfully to server');

    const db = client.db(dbName);

    for (let [key, value] of Object.entries(defaultState)) {
      const collection = db.collection(key);
      await collection.insertMany(value);
    }
    client.close();
  });
}
initializeDb();
