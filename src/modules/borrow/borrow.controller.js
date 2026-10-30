import { Router } from "express";
import {
  createBorrowService,
  getBorrowsService,
  getBorrowByIdService,
  updateBorrowService,
  deleteBorrowService,
  countBorrowsService,
} from "./borrow.services.js";
import { response } from "../../common/utils/response.js";

export const borrowRouter = Router();

borrowRouter.post('/', async (req, res, next)=>{
    try {
        const borrow = await createBorrowService(req.body);
        return response(res, borrow, "Borrow created successfully", 201);
    } catch (err) {
        next(err);
    }
});

borrowRouter.post('/bulk', async (req, res, next)=>{
    try {
        const borrows = await createBorrowService(req.body);
        return response(res, borrows, "Borrows created successfully", 201);
    } catch (err) {
        next(err);
    }
});

borrowRouter.get('/', async (req, res, next)=>{
    try {
        const { page, limit } = req.query;
        const borrows = await getBorrowsService({ page, limit });
        return response(res, borrows, "Borrows fetched successfully");
    } catch (err) {
        next(err);
    }
});

borrowRouter.get('/count', async (req, res, next)=>{
    try {
        const count = await countBorrowsService(req.query);
        return response(res, { count }, "Borrows count fetched successfully");
    } catch (err) {
        next(err);
    }
});

borrowRouter.get('/:id', async (req, res, next)=>{
    try {
        const borrow = await getBorrowByIdService(req.params.id);
        if (!borrow) {
            return response(res, null, "Borrow not found", 404);
        }
        return response(res, borrow, "Borrow fetched successfully");
    } catch (err) {
        next(err);
    }
});

borrowRouter.put('/:id', async (req, res, next)=>{
    try {
        const borrow = await updateBorrowService(req.params.id, req.body);
        if (!borrow) {
            return response(res, null, "Borrow not found", 404);
        }
        return response(res, borrow, "Borrow updated successfully");
    } catch (err) {
        next(err);
    }
});

borrowRouter.delete('/:id', async (req, res, next)=>{
    try {
        const borrow = await deleteBorrowService(req.params.id);
        if (!borrow) {
            return response(res, null, "Borrow not found", 404);
        }
        return response(res, borrow, "Borrow deleted successfully");
    } catch (err) {
        next(err);
    }
});