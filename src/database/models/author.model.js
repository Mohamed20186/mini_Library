import mongoose from "mongoose";

const authorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [60, "Name cannot exceed 60 characters"],
    },
    bio: {
      type: String,
      maxLength: [500, "Bio cannot exceed 500 characters"],
    },
    birthDate: {
      type: Date,
      validator: (value) => {
        return value == null || value.getTime() <= Date.now();
      },
      message: "Birth date cannot be in the future",
    },
    nationality: {
      type: String,
      default: "Egyptian",
    },
    socialLinks: {
      type: Map,
      of: String,
    },
  },
  {
    timestamps: true,
  },
);

export const authorModel = mongoose.model("author", authorSchema);
