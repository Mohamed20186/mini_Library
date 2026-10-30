import * as borr from "../../repos/borrow.repo.js";

export const createBorrowService = (data) => {
  return borr.createBorrow(data);
};

export const getBorrowsService = (options) => {
  return borr.findBorrow(options);
};

export const getOneBorrowService = (filter) => {
  return borr.findOneBorrow(filter);
};

export const getBorrowByIdService = (id) => {
  return borr.findBorrowById(id);
};

export const updateBorrowService = (id, data) => {
  return borr.updateBorrowById(id, data);
};

export const deleteBorrowService = (id) => {
  return borr.deleteBorrowById(id);
};

export const countBorrowsService = (filter) => {
  return borr.countBorrows(filter);
};

export const addBulkBorrowsService = (data) => {
  return borr.addBulkBorrows(data);
};