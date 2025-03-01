import express, { Router } from "express";
import { addBookmark , getBookmark , removeBookmark } from "../controllers/bookmarkController.js";

const bookmarkRoutes = express.Router()

bookmarkRoutes.post('/:id/bookmarks' , addBookmark)
bookmarkRoutes.get('/:id/bookmarks' , getBookmark)
bookmarkRoutes.delete('/:id/bookmarks/:articleId' , removeBookmark)

export default bookmarkRoutes ;