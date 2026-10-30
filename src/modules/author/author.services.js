import * as ar from "../../repos/author.repo.js";

export const createAuthorService = (data)=>{
  return ar.createAuthor(data);
}

export const getAuthorsService = (options)=>{
  return ar.findAuthor(options);
}

export const getAuthorByIdService = (id)=>{
  return ar.findAuthorById(id);
}

export const updateAuthorService = (id, data)=>{
  return ar.updateAuthorById(id, data);
}

export const deleteAuthorService = (id)=>{
  return ar.deleteAuthorById(id);
}


