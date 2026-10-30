import { Router } from "express";
import {
  createBookService,
  getBooksService,
  getBookByIdService,
  updateBookService,
  deleteBookService,
  countBooksService,
} from "./book.services.js";
import { response } from "../../common/utils/response.js";

export const bookRouter = Router();

bookRouter.post('/', async (req, res, next)=>{
    try {
        const book = await createBookService(req.body);
        return response(res, book, "Book created successfully", 201);
    } catch (err) {
        next(err);
    }
});

bookRouter.get('/', async (req, res, next)=>{
    try {
        const { page, limit } = req.query;
        const books = await getBooksService({ page, limit });
        return response(res, books, "Books fetched successfully");
    } catch (err) {
        next(err);
    }
});

// يجب أن تكون قبل :id لكي لا يتم اعتبار كلمة count كمعرف
bookRouter.get('/count', async (req, res, next)=>{
    try {
        const count = await countBooksService(req.query);
        return response(res, { count }, "Books count fetched successfully");
    } catch (err) {
        next(err);
    }
});

bookRouter.get('/:id', async (req, res, next)=>{
    try {
        const book = await getBookByIdService(req.params.id);
        if (!book) {
            return response(res, null, "Book not found", 404);
        }
        return response(res, book, "Book fetched successfully");
    } catch (err) {
        next(err);
    }
});

bookRouter.put('/:id', async (req, res, next)=>{
    try {
        const book = await updateBookService(req.params.id, req.body);
        if (!book) {
            return response(res, null, "Book not found", 404);
        }
        return response(res, book, "Book updated successfully");
    } catch (err) {
        next(err);
    }
});

bookRouter.delete('/:id', async (req, res, next)=>{
    try {
        const book = await deleteBookService(req.params.id);
        if (!book) {
            return response(res, null, "Book not found", 404);
        }
        return response(res, book, "Book deleted successfully");
    } catch (err) {
        next(err);
    }
});