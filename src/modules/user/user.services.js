import * as ur from "../../repos/user.repo.js";

export const createUserService = (data) => {
  return ur.createUser(data);
};

export const getUsersService = (options) => {
  return ur.findUser(options);
};

export const getOneUserService = (filter) => {
  return ur.findOneUser(filter);
};

export const getUserByIdService = (id) => {
  return ur.findUserById(id);
};

export const updateUserService = (id, data) => {
  return ur.updateUserById(id, data);
};

export const deleteUserService = (id) => {
  return ur.deleteUserById(id);
};

export const countUsersService = (filter) => {
  return ur.countUsers(filter);
};

export const addBulkUsersService = (data) => {
  return ur.addBulkUsers(data);
};