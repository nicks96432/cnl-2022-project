import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:3000";

const useChat = roomId => {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/chatrooms/${roomId}`
      );
      setMessages(data.messages);
      // Creates a WebSocket connection
      socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
        query: { roomId }
      });

      // Listens for incoming messages
      socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, message => {
        const incomingMessage = {
          ...message,
          ownedByCurrentUser: message.senderId === socketRef.current.id
        };
        setMessages(messages => [...messages, incomingMessage]);
      });
      return () => {
        socketRef.current.disconnect();
      };
    })();
    // Destroys the socket reference
    // when the connection is closed
  }, [roomId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = messageBody => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id
    });
  };

  return { messages, sendMessage };
};

export default useChat;
