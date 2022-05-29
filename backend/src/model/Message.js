import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

const Message = model("Message", MessageSchema);

export default Message;
