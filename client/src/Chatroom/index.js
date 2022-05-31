import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Context from "../Context";
import useChat from "./useChat";
import ReactScrollableList from "react-scrollable-list";
import "./Chatroom.css";

const ChatRoom = () => {
  const { roomId } = useParams(); // Gets roomId from URL
  const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = useState(""); // Message to be sent
  const { userId } = useContext(Context);

  // const fakeData = [
  //   { user: { _id: 20, name: "A" }, content: "test1" },

  // ];

  const li = messages.map((message, i) =>
    userId === message.user._id
      ? {
          id: i,
          content: (
            <div className="message__self" key={i}>
              <div className="user">{message.user.name}</div>
              <div className="content">
                <div className="text">{message.content}</div>
              </div>
            </div>
          )
        }
      : {
          id: i,
          content: (
            <div className="message__other" key={i}>
              <div className="user">{message.user.name}</div>
              <div className="content">
                <div className="text">{message.content}</div>
              </div>
            </div>
          )
        }
  );

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
        {
          <ReactScrollableList
            listItems={li}
            heightOfItem={20}
            maxItemsToRender={13}
            style={{ color: "#333" }}
            className="container"
          />
        }
      </div>
      <div className="new-message">
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
    </div>
  );
};

export default ChatRoom;
