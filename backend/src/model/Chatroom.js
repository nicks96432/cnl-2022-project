import { model, Schema } from "mongoose";

const ChatroomSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    admins: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: []
    },
    messages: {
      type: [Schema.Types.ObjectId],
      ref: "Message",
      default: []
    }
  },
  { timestamps: true }
);

const Chatroom = model("Chatroom", ChatroomSchema);

export default Chatroom;
