import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { required: true, type: String, unique: true },
    password: { required: true, type: String }
  },
  { timestamps: true }
);

const User = model("User", UserSchema);

export default User;
