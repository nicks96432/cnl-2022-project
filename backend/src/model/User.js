import { Schema, model } from "mongoose";
import crypto from "crypto";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    hash: String,
    salt: String,
  },
  { timestamps: true }
);

// Method to set salt and hash the password for a user
UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt,
    1000, 64, `sha512`).toString(`hex`);
};

// Method to check the entered password is correct or not
UserSchema.methods.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password,
    this.salt, 1000, 64, `sha512`).toString(`hex`);
  return this.hash === hash;
};

UserSchema.methods.isAdmin = function (chatroom) {
  return chatroom.admin._id == this._id;
}

const User = model("User", UserSchema);

export default User;
