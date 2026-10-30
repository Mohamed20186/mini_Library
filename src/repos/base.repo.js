import { model } from "mongoose";

export const create = async (model, data) => {
  return await model.create(data);
};

export const find = async (model) => {
  return await model.find();
};

export const findOne = async (model, filter = {}) => {
  return await model.findOne(filter);
};

export const findById = async (model, id) => {
  return await model.findById(id);
};

export const updateById = async (model, id, data) => {
  return await model.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteById = async (model , id) =>{
      return await model.findByIdAndDelete(id);
}

export const count = (model, filter = {}) => {
    return model.countDocuments(filter);
};
