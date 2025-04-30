import express from 'express';
import { createUserBet } from './controller/setUserBet';
const app = express()
const port = 3000

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