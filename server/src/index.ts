import express from 'express';
import dotenv from 'dotenv';
import { createUserBet } from './controller/setUserBet';
import mongoose from 'mongoose';

const app = express()
const port = 3000

dotenv.config();
console.log('DB_URL:', process.env.DB_URL);

const dbUrl = process.env.DB_URL
const database = process.env.DB_NAME

mongoose.connect(`${dbUrl}/${database}`)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

console.log("Hello World")

app.use(express.static('public')) //serve static files from folder "public"
// Routes
//root route
app.get('/hi', (req:any, res:any) => {
console.log("someone called me")
  res.send('<h1>Hello From Express</h1><p>Express is a web application framework for Node.js</p>')
})

app.post('/user-bet', createUserBet);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})