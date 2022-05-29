import { createServer } from "http";
import dotenv_defaults from "dotenv-defaults";
import Mongoose from "mongoose";
import SocketIO from "socket.io";
import express from "express";
import User from "./model/User";
import Message from "./model/Message";
import Chatroom from "./model/Chatroom";
import cookieSession from 'cookie-session';

dotenv_defaults.config();

// api
const app = express();
app.use(express.urlencoded({ extended: true })); // For req.query
app.use(express.json()); // For req.body
app.use(
  cookieSession({
    signed: false, // disable encryption on cookie, cause JWT itself is already encrypted.
    maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
    sameSite: 'lax',
    path: '/',
  }),
);
app.use((req, res, next) => {
  console.log(req.url);
  console.log(req.body);
  next();
});
app.get('/', (req, res) => {
  res.send('hi');
})

app.get('/users', async (req, res) => {
  res.send(await User.find({}));
})

app.post('/users/create', async (req, res) => {
  const { name, password } = req.body;
  const newUser = await User.create({ name, password });
  res.send(newUser);
})

app.get('/messages', async (req, res) => {
  res.send(await Message.find({}));
})

app.get('/chatrooms', async (req, res) => {
  res.send(await Chatroom.find({}));
})

app.get('*', function (req, res) {
  res.status(404).send('Not Found');
});

// MONGO
if (!process.env.MONGO_URL) {
  console.error("Missing MONGO_URL.");
  process.exit(1);
}
Mongoose.connect(process.env.MONGO_URL);
const db = Mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => {
  console.log("Connected to MongoDB.");

  const server = createServer(app);
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
      console.log(`Client ${socket.id} disconnected`);
      socket.leave(roomId);
    });
  });

  server.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}.`);
  });
});
