import { createServer } from "http";
import dotenv_defaults from "dotenv-defaults";
import Mongoose from "mongoose";
import SocketIO from "socket.io";
import express from "express";
import User from "./model/User";
import Message from "./model/Message";
import Chatroom from "./model/Chatroom";
import cookieSession from 'cookie-session';
import cors from "cors";

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
app.use(cors())
app.use((req, res, next) => {
  console.log(req.url);
  console.log(req.body);
  console.log(req.params);
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
  const newUser = new User({ name });
  newUser.setPassword(password);
  req.session.userId = newUser._id;
  await newUser.save();
  res.send(newUser);
})

app.post('/users/login', async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name });
  if (user && user.validPassword(password)) {
    req.session.userId = user._id;
    res.send('Logged in successfully!')
  }
  res.send('Failed to login!')
})

app.get('/messages', async (req, res) => {
  res.send(await Message.find({}));
})

app.get('/chatrooms', async (req, res) => {
  res.send(await Chatroom.find({}));
})

app.post('/chatrooms/create', async (req, res) => {
  const { name } = req.body;
  const { userId } = req.session;
  const newRoom = new Chatroom({ name });
  newRoom.admins.push(userId);
  await newRoom.save();
  res.send(newRoom);
})

app.get('/chatrooms/:roomId', async (req, res) => {
  const { roomId } = req.params;
  res.send(await Chatroom.findById(roomId).populate());
})

app.post('/chatrooms/:roomId/messages/create', async (req, res) => {
  const { roomId, content } = req.body;
  const { userId } = req.session;
  const chatroom = await Chatroom.findById(roomId);
  const newMessage = await Message.create({ content, user: userId });
  chatroom.messages.push(newMessage._id);
  chatroom.save();
  res.send(newMessage);
})

app.delete('/chatrooms/:roomId/messages/:messageId', async (req, res) => {
  const { roomId, messageId } = req.params;
  const { userId } = req.session;
  if (userId && (await User.findById(userId)).isAdmin(await Chatroom.findById(roomId))) {
    await Message.deleteById(messageId);
  }
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
