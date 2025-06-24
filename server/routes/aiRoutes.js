import express from 'express';
import { getSummary, newsSummarize } from '../controllers/aiController.js';

const aiRoutes = express.Router()

aiRoutes.post('/summarize' , newsSummarize)
aiRoutes.get('/summary' , getSummary)


export default aiRoutes