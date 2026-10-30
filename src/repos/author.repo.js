import { authorModel } from "../database/models/author.model.js";
import { create } from "./base.repo.js";

export const createAuthor = async (data)=>{
    return await create(authorModel,data);
}

