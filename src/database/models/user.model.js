
import mongoose from "mongoose";
import { role } from "../../common/enums/roles.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        "Please fill a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    phone: {
      type: String,
      match: [
        /^(01)[0125][0-9]{8}$/,
        "Please enter a valid Egyptian phone number",
      ],
    },

    age: {
      type: Number,
      min: [12, "Age must be at least 12"],
      max: [100, "Age cannot exceed 100"],
    },

    role: {
      type: String,
      enum: Object.values(role),
      default: role.member,
    },

    address: {
      city: {
        type: String,
        trim: true,
      },
      street: {
        type: String,
        trim: true,
      },
    },

    favoriteBooks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,

    toObject: {
      virtuals: true,
    },

    toJSON: {
      virtuals: true,
    },
  },
);

export const userModel = mongoose.model("user", userSchema);
