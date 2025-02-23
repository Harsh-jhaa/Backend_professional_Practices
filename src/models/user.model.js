import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshTokens: {
      type: String,
    },
  },
  { timestamps: true }
);

// since here we need the reference of the eauserSchema , we can't use arrow functions here , instead we use normal functions
// this pre is a middleware function or hook so next
// here it means , before "save" this function will run
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // means if password is not modified then don't do anything
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
// to compare password
userSchema.methods.isPasswordCorrect = async function (password) {
  // returns true or false values
  return await bcrypt.compare(password, this.password);
};

// to generate jwt token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      // these are the payloads to be included in the token
      _id: this._id,
      username: this.username,
      fullname: this.fullname,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      // these are the payloads to be included in the token
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
export const User = mongoose.model("User", userSchema);
