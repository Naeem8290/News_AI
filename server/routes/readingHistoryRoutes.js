import express, { Router } from "express";
import { addReadingHistory , getReadingHistory , clearReadingHistory } from "../controllers/readingHistoryController.js";
const readingHistoryRoutes = express.Router()

readingHistoryRoutes.post('/:id/reading-history' , addReadingHistory)
readingHistoryRoutes.get('/:id/reading-history' , getReadingHistory)
readingHistoryRoutes.delete('/:id/reading-history' , clearReadingHistory)


export default readingHistoryRoutes ;