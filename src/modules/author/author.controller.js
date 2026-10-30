import { Router } from "express";
import {
  createAuthorService,
  getAuthorsService,
  getAuthorByIdService,
  updateAuthorService,
  deleteAuthorService,
  countAuthorsService,
  addBulkAuthorsService, 
} from "./author.services.js";
import { response } from "../../common/utils/response.js";

export const authorRouter = Router();

authorRouter.post('/', async (req, res, next)=>{
    try {
        const author = await createAuthorService(req.body);
        return response(res, author, "Author created successfully", 201);
    } catch (err) {
        next(err);
    }
});
authorRouter.post('/bulk', async (req, res, next)=>{
    try {
        const authors = await addBulkAuthorsService(req.body);
        return response(res, authors, "Authors created successfully", 201);
    } catch (err) {
        next(err);
    }
});

authorRouter.get('/', async (req, res, next)=>{
    try {
        const { page, limit } = req.query;
        const authors = await getAuthorsService({ page, limit });
        return response(res, authors, "Authors fetched successfully");
    } catch (err) {
        next(err);
    }
});

authorRouter.get('/count', async (req, res, next)=>{
    try {
        const count = await countAuthorsService(req.query);
        return response(res, { count }, "Authors count fetched successfully");
    } catch (err) {
        next(err);
    }
});

authorRouter.get('/:id', async (req, res, next)=>{
    try {
        const author = await getAuthorByIdService(req.params.id);
        if (!author) {
            return response(res, null, "Author not found", 404);
        }
        return response(res, author, "Author fetched successfully");
    } catch (err) {
        next(err);
    }
});

authorRouter.put('/:id', async (req, res, next)=>{
    try {
        const author = await updateAuthorService(req.params.id, req.body);
        if (!author) {
            return response(res, null, "Author not found", 404);
        }
        return response(res, author, "Author updated successfully");
    } catch (err) {
        next(err);
    }
});

authorRouter.delete('/:id', async (req, res, next)=>{
    try {
        const author = await deleteAuthorService(req.params.id);
        if (!author) {
            return response(res, null, "Author not found", 404);
        }
        return response(res, author, "Author deleted successfully");
    } catch (err) {
        next(err);
    }
});