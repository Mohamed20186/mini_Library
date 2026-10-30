import * as bk from "../../repos/book.repo.js";

export const createBookService = (data) => {
  return bk.createBook(data);
};

export const getBooksService = (options) => {
  return bk.findBook(options);
};

export const getOneBookService = (filter) => {
  return bk.findOneBook(filter);
};

export const getBookByIdService = (id) => {
  return bk.findBookById(id);
};

export const updateBookService = (id, data) => {
  return bk.updateBookById(id, data);
};

export const deleteBookService = (id) => {
  return bk.deleteBookById(id);
};

export const countBooksService = (filter) => {
  return bk.countBooks(filter);
};