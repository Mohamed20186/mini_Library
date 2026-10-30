import { model } from "mongoose";

export const create = async (model, data) => {
  return await model.create(data);
};

export const find = async (model, options = {} ) => {
    const {
        page = 1,
        limit = 10
    } = options;
    const skip = (page - 1 ) * limit ;
   return model.find().skip(skip).limit(limit);
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
