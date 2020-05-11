import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { connectDB } from './connect-db';
import { IgnorePlugin } from 'webpack';

const port = 7777;

const app = express();

app.listen(port, console.log('Server listening on port', port));

app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());

export const addNewTask = async (task) => {
  const { db, client } = await connectDB();
  const collection = db.collection('tasks');
  await collection.insertOne(task);
};

export const updateTask = async (task) => {
  const { id, group, isComplete, name } = task;
  const dbConnection = await connectDB();
  const collection = dbConnection.db.collection('tasks');

  if (group) {
    await collection.updateOne({ id }, { $set: { group } });
  }
  if (name) {
    await collection.updateOne({ id }, { $set: { name } });
  }
  if (isComplete !== undefined) {
    await collection.updateOne({ id }, { $set: { isComplete } });
  }
};

app.post('/task/new', async (req, res) => {
  try {
    const task = req.body.task;
    await addNewTask(task);
    res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
});

app.put('/task/update', async (req, res) => {
  try {
    const task = req.body.task;
    await updateTask(task);
    res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
});
