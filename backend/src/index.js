import { createServer } from "http";
import dotenv_defaults from "dotenv-defaults";
import Mongoose from "mongoose";
import SocketIO from "socket.io";

dotenv_defaults.config();

if (!process.env.MONGO_URL) {
  console.error("Missing MONGO_URL.");
  process.exit(1);
}

Mongoose.connect(process.env.MONGO_URL);

const db = Mongoose.connection;

db.on("error", error => console.error(error));

db.once("open", () => {
  console.log("Connected to MongoDB.");

  const server = createServer();
  const io = SocketIO(server, {
    cors: {
      origin: "*"
    }
  });

  const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

  io.on("connection", socket => {
    console.log(`Client ${socket.id} connected`);

    // Join a conversation
    const { roomId } = socket.handshake.query;
    socket.join(roomId);

    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, data => {
      io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
      console.log(`Client ${socket.id} diconnected`);
      socket.leave(roomId);
    });
  });

  server.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}.`);
  });
});
