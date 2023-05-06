import express from 'express';
import cors from 'cors';
import morgan from "morgan";
import helmet from "helmet";
import Router from "./routes/allRoute.js";
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;
const corsOptions = {
  origin: "http://127.0.0.1:5173/"
};
// middleware;
app.use(cookieParser());
app.use(express.json());
app.use('/getfiles/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(cors());
app.disable('x-powered-by');
app.use(helmet(corsOptions));




app.use('/api', Router);
connectDB();

app.listen(PORT, () => { console.log(`Server listining on ${PORT}`)});