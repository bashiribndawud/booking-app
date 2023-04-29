import express from 'express';
import cors from 'cors';
import morgan from "morgan";
import helmet from "helmet";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/authRouter.js";
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8000;
const corsOptions = {
  origin: "http://127.0.0.1:5173/"
};
// middleware;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(cors());
app.disable('x-powered-by');
app.use(helmet(corsOptions));



app.use('/api/auth', authRouter);
connectDB();

app.listen(PORT, () => { console.log(`Server listining on ${PORT}`)});