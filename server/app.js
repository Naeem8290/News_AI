import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import newsRoutes from './routes/newsRoutes.js';
import bookmarkRoutes from './routes/bookmarkRoutes.js'
import readingHistoryRoutes from './routes/readingHistoryRoutes.js'
import morgan from 'morgan';
import aiRoutes from './routes/aiRoutes.js';
// import axios from 'axios'
import cron from 'node-cron';
// import News from './models/News.js';

import crudRoutes from './routes/crudRoutes.js';

import fetchNewsAndStore from './services/newsFetcher.js'
// cron.schedule('*/31 * * * *', fetchNewsAndStore);

import admin from 'firebase-admin'
// import serviceAccount from './key/news-48af9-firebase-adminsdk-fbsvc-8f398d8c94.json'  with { type: "json" } ;
// import bookmarkHistoryRoutes from './routes/BookmarkHistoryRoutes.js';


const app = express();
morgan('combined')

const allowedOrigins = [
  "http://localhost:5173",
  "http://3.91.83.171",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);



app.set('trust proxy', 1);

app.use(cookieParser())
app.use(express.json());
dotenv.config();

dbConnect();


const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


app.get('/', (req,res)=>{
res.send('homepage')
})


app.use('/upload', express.static('upload'));
app.use('/auth', userRoutes);
app.use('/api' , newsRoutes)
app.use('/api' , bookmarkRoutes)
app.use('/api' , readingHistoryRoutes)
// app.use('/api' , bookmarkHistoryRoutes)
app.use('/api' , aiRoutes)

app.use('/api/users', crudRoutes);

app.listen(process.env.PORT,  "0.0.0.0" , () => {
  console.log(`Server is running on the PORT ${process.env.PORT}`);
});