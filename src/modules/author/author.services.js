import * as ar from "../../repos/author.repo.js";

export const createAuthorService = (data)=>{
  return ar.createAuthor(data) ;
}