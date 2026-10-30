import { authorModel } from "../database/models/author.model.js";
import * as br from "./base.repo.js";

export const createAuthor = async (data)=>{
    return await br.create(authorModel,data);
}

export const findAuthor = async (options)=>{
    return await br.find(authorModel, options);
}

export const findOneAuthor = async (filter)=>{
    return await br.findOne(authorModel, filter);
}

export const findAuthorById = async (id)=>{
    return await br.findById(authorModel, id);
}

export const updateAuthorById = async (id, data)=>{
    return await br.updateById(authorModel, id, data);
}

export const deleteAuthorById = async (id)=>{
    return await br.deleteById(authorModel, id);
}

export const countAuthors = async (filter)=>{
    return await br.count(authorModel, filter);
}

export const addBulkAuthors = async (data)=>{
    return await br.addBulk(authorModel,data);
}