import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config()
async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to Database')
    } catch (error) {
       console.log(error);     
       process.exit(1)
    }
}

export default connectToDB