import express, { Router } from "express";
import { addBookmark , getBookmarks, removeBookmark } from "../controllers/bookmarkController.js";

const bookmarkRoutes = express.Router()

bookmarkRoutes.post('/:id/bookmarks' , addBookmark)
bookmarkRoutes.get('/:id/bookmarks' , getBookmarks)
bookmarkRoutes.delete('/:id/bookmarks' , removeBookmark)

export default bookmarkRoutes ;