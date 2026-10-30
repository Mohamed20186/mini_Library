import { Router } from "express";
import {
  createUserService,
  getUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  countUsersService,
} from "./user.service.js";
import { response } from "../../common/utils/response.js";

export const userRouter = Router();

userRouter.post('/', async (req, res, next)=>{
    try {
        const user = await createUserService(req.body);
        return response(res, user, "User created successfully", 201);
    } catch (err) {
        next(err);
    }
});

userRouter.get('/', async (req, res, next)=>{
    try {
        const { page, limit } = req.query;
        const users = await getUsersService({ page, limit });
        return response(res, users, "Users fetched successfully");
    } catch (err) {
        next(err);
    }
});

userRouter.get('/count', async (req, res, next)=>{
    try {
        const count = await countUsersService(req.query);
        return response(res, { count }, "Users count fetched successfully");
    } catch (err) {
        next(err);
    }
});

userRouter.get('/:id', async (req, res, next)=>{
    try {
        const user = await getUserByIdService(req.params.id);
        if (!user) {
            return response(res, null, "User not found", 404);
        }
        return response(res, user, "User fetched successfully");
    } catch (err) {
        next(err);
    }
});

userRouter.put('/:id', async (req, res, next)=>{
    try {
        const user = await updateUserService(req.params.id, req.body);
        if (!user) {
            return response(res, null, "User not found", 404);
        }
        return response(res, user, "User updated successfully");
    } catch (err) {
        next(err);
    }
});

userRouter.delete('/:id', async (req, res, next)=>{
    try {
        const user = await deleteUserService(req.params.id);
        if (!user) {
            return response(res, null, "User not found", 404);
        }
        return response(res, user, "User deleted successfully");
    } catch (err) {
        next(err);
    }
});