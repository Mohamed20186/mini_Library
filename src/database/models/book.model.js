import mongoose, { Schema } from "mongoose";
import { genresEnum } from "../../common/enums/genres.js";

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      tirm: true,
      minLength: [2, "Name must be at least 2 characters"],
    },
    isbn: {
      trpe: String,
      immutable: true,
      required: [true, "ISBN field is required"],
      unique: true,
      match: [/^\d{13}$/, "Please fill a valid 13-digit ISBN"],
    },
    auther: {
      trpe: mongoose.Schema.Types.ObjectId,
      ref: "author",
      required: [true, "auther field is required"],
    },
    genres: {
      type: String,
      enum: [Object.values(genresEnum)],
      required: [true, "genres field is required"],
      validate: {
        validator: function (value) {
          return v && v.lenght > 0;
        },
        message: "At least one genre is required.",
      },
    },
    price: {
      type: Number,
      required: [true, "price field is required"],
      min: [0, "Price cannot be negative"],
      set: (v) => Math.round(v * 100) / 100,
    },
    pages: {
      type: Number,
      min: [1, "Pages must be at least 1"],
      max: [5000, "Pages cannot exceed 5000"],
    },
    copies: {
      type: Number,
      min: [0, "Copies cannot be negative"],
      default: 1,
    },
    tags: {
      type: [String],
      set: (v) => v.map((tag) => tag.toLowerCase().trim()),
    },
    details: {
      language: {
        type: String,
        default: "English",
      },
      publisher: {
        type: String,
      },
      edition: {
        type: Number,
      },
    },
    reviews: [reviewSchema],
    meta: {
      type: mongoose.Schema.Types.Mixed,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toObject: { vertual: true },
    toJSON: { vertual: true },
  },
);

export const bookModel = mongoose.model("book", bookSchema);
