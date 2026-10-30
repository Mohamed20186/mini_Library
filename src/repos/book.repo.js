import { bookModel } from "../database/models/book.model.js";
import * as br from "./base.repo.js";

export const createBook = async (data)=>{
    return await br.create(bookModel, data);
}

export const findBook = async (options)=>{
    return await br.find(bookModel, options);
}

export const findOneBook = async (filter)=>{
    return await br.findOne(bookModel, filter);
}

export const findBookById = async (id)=>{
    return await br.findById(bookModel, id);
}

export const updateBookById = async (id, data)=>{
    return await br.updateById(bookModel, id, data);
}

export const deleteBookById = async (id)=>{
    return await br.deleteById(bookModel, id);
}

export const countBooks = async (filter)=>{
    return await br.count(bookModel, filter);
}