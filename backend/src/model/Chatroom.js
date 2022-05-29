import { model, Schema } from "mongoose";

const ChatroomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    admins: {
      type: [Schema.Types.ObjectId],
      ref: "User"
    },
    messages: {
      type: [Schema.Types.ObjectId],
      ref: "Message"
    }
  },
  { timestamps: true }
);

const Chatroom = model("Chatroom", ChatroomSchema);

export default Chatroom;
