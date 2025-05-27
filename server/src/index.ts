import express from 'express';
import dotenv from 'dotenv';
import { createUserBet } from './controller/setUserBet';
import mongoose from 'mongoose';
import usersRouter from './routes/users/userRoutes';
import betsRouter from './routes/bets/betRoutes';
import  cors from 'cors';


const app = express()
const port = 3000

// Middleware
app.use(cors());
app.use(express.json());
dotenv.config();
console.log('DB_URL:', process.env.DB_URL);
console.log('DB_NAME:', process.env.DB_NAME);

const dbUrl = process.env.DB_URL
const database = process.env.DB_NAME


//json parser
app.use(express.json());
//json parser

//userRoute
app.use('/users',usersRouter);
app.use('/bets',betsRouter);
//userRoute

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