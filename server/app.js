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
// cron.schedule('*/15 * * * *', fetchNewsAndStore);

import admin from 'firebase-admin'
// import serviceAccount from './key/news-48af9-firebase-adminsdk-fbsvc-8f398d8c94.json'  with { type: "json" } ;
// import bookmarkHistoryRoutes from './routes/BookmarkHistoryRoutes.js';


const app = express();
morgan('combined')

// app.use(
//     cors({
//         credentials: true,
//         origin: "https://news-ai-eight.vercel.app",
//     })
// );

// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://newsaiproject.s3-website-us-east-1.amazonaws.com"
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true
//   })
// );

const allowedOrigins = [
  "http://localhost:5173",
  "http://newsaiproject.s3-website-us-east-1.amazonaws.com",
  "http://backend.newsaiproject.local:3000"  // <-- your new backend domain
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




// app.use(
//   cors({
//       credentials: true,
//       origin: "http://localhost:5173",
//   })
// );

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



//----------------------------------------------------------

// const countries = ['us', 'uk', 'fr', 'in', 'it'];
// const categories = [
//   'health',
//   'science',
//   'sports',
//   'entertainment',
//   'politics',
//   'business',
// ];
// const fetchNewsAndStore = async () => {
//   for (let country of countries) {
//     for (let category of categories) {
//       const { data } = await axios.get(
//         `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=${process.env.NEWS_API_KEY}`
//       );

//       if (data.articles && data.articles.length > 0) {
//         for (let d of data.articles) {
//           const exist = await News.findOne({ title: d.title });

//           if (!exist) {
//             const newData = await News.create({
//               content: d.content,
//               title: d.title,
//               author: d.author,
//               description: d.description,
//               url: d.url,
//               urlToImage: d.urlToImage,
//               category,
//               publishedAt: d.publishedAt,
//               country,
//               source: {
//                 id: d.source.id,
//                 name: d.source.name,
//               },
//             });
//             console.log(`Inserted ${d.title} [${category}-${country}]`);
//           } else {
//             console.log(`Already exists ${d.title}`);
//           }
//         }
//       } else {
//         console.log('no data found');
//       }
//     }
//   }
// };
// fetchNewsAndStore();
// cron.schedule('*/15 * * * *', fetchNewsAndStore);


//-------------------------------------------------------

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