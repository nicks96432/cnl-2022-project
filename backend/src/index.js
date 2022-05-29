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
  const newUser = new User({ name });
  newUser.setPassword(password);
  res.cookie('userId', newUser._id);
  await newUser.save();
  res.send(newUser);
})

app.post('/users/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && user.validPassword(password)) {
    res.cookie('userId', user._id);
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

app.get('/chatrooms/:name', async (req, res) => {
  const { name } = req.params;
  res.send(await Chatroom.findOne({ name }));
})

app.post('/chatrooms/:name/messages/create', async (req, res) => {
  const { name, content } = req.body;
  const { userId } = req.signedCookies;
  const chatroom = await Chatroom.findOne({ name });
  const newMessage = await Message.create({ content, user: userId });
  chatroom.messages.push(newMessage._id);
  chatroom.save();
  res.send(newMessage);
})

app.delete('/chatrooms/:name/messages/:messageId', async (req, res) => {
  const { name, messageId } = req.params;
  const { userId } = req.signedCookies;
  if (userId && (await User.findById(userId)).isAdmin(await Chatroom.findOne({ name }))) {
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
