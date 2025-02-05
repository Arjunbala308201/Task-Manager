import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Router from './Router/taskRouter.js';
import userRouter from './Router/userRouter.js'
import adminRouter from './Router/adminRoutes.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000; // Fallback to default port if undefined
const mongo_url = process.env.MONGO_URL; // Ensure variable name matches `.env`

if (!mongo_url) {
  console.error("Error: MONGO_URL is not defined in the environment variables.");
  process.exit(1); // Exit the process if mongo_url is missing
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1); // Exit the process if database connection fails
  }
};
connectToDatabase();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/task', Router);
app.use('/guest',userRouter)
app.use('/admin',adminRouter)
app.listen(port, () => {
  console.log(`Server is running on port  ${port}`);
});
