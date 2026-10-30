import { userModel } from "../database/models/user.model.js";
import * as br from "./base.repo.js";

export const createUser = async (data)=>{
    return await br.create(userModel, data);
}

export const findUser = async (options)=>{
    return await br.find(userModel, options);
}

export const findOneUser = async (filter)=>{
    return await br.findOne(userModel, filter);
}

export const findUserById = async (id)=>{
    return await br.findById(userModel, id);
}

export const updateUserById = async (id, data)=>{
    return await br.updateById(userModel, id, data);
}

export const deleteUserById = async (id)=>{
    return await br.deleteById(userModel, id);
}

export const countUsers = async (filter)=>{
    return await br.count(userModel, filter);
}

export const addBulkUsers = async (data)=>{
    return await br.addBulk(userModel,data);
}