import { borrowModel } from "../database/models/borrow.model.js";
import * as br from "./base.repo.js";

export const createBorrow = async (data)=>{
    return await br.create(borrowModel, data);
}

export const findBorrow = async (options)=>{
    return await br.find(borrowModel, options);
}

export const findOneBorrow = async (filter)=>{
    return await br.findOne(borrowModel, filter);
}

export const findBorrowById = async (id)=>{
    return await br.findById(borrowModel, id);
}

export const updateBorrowById = async (id, data)=>{
    return await br.updateById(borrowModel, id, data);
}

export const deleteBorrowById = async (id)=>{
    return await br.deleteById(borrowModel, id);
}

export const countBorrows = async (filter)=>{
    return await br.count(borrowModel, filter);
}