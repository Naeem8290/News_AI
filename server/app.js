import express from 'express'
import dotenv from 'dotenv'
import dbConnect from './config/db.js';
import userRoutes from './routes/userRoutes.js';


const app = express();

dotenv.config();

app.use(express.json())

dbConnect();

app.use('/auth' , userRoutes);
console.log(process.env.PORT)
app.listen(process.env.PORT , () => { console.log(`server is running on PORT ${process.env.PORT}`);
});
