import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'
import userRoute from "./routes/user.js"
import authRoute from './routes/auth.js'
import dotenv from 'dotenv'

// Create a new Express application
dotenv.config();
const app = express()
const port = 4000;
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

const connect = async () => {
  await mongoose
    .connect('mongodb://127.0.0.1:27017/shop-clothes')
    .then(() => {
      console.log("connect DB success!");
    })
    .catch(err => {
      throw err;
    });
}
connect()

app.use("/api/auth", authRoute);
app.use("/api/user",userRoute);

app.listen(port, function () {
  console.log(' app listening on port ' + port)
})
