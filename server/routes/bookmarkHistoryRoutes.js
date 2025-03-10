import express, { Router } from "express";
import { addBookmarkHistory, clearBookmarkHistory, getBookmarkHistory } from "../controllers/bookmarkHistoryController.js";

const bookmarkHistoryRoutes = express.Router()

bookmarkHistoryRoutes.post('/:id/bookmark-history' , addBookmarkHistory)
bookmarkHistoryRoutes.get('/:id/bookmark-history' , getBookmarkHistory)
bookmarkHistoryRoutes.delete('/:id/bookmark-history/:articleId' , clearBookmarkHistory)


export default bookmarkHistoryRoutes ;