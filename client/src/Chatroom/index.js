import React, { useState } from "react";
import { useParams } from "react-router-dom";

import useChat from "./useChat";
import "./Chatroom.css";

const ChatRoom = () => {
  const { roomId } = useParams(); // Gets roomId from URL
  const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = useState(""); // Message to be sent

  const handleNewMessageChange = event => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="Chatroom">
      <h1 className="Chatroom__title">Room: {roomId}</h1>
      <div className="Chatroom__message-list">
        {messages.map((message, i) => (
          <div key={i}>{message.body}</div>
        ))}
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
};

export default ChatRoom;
