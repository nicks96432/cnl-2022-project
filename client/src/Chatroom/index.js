import { useState, useContext, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Context from "../Context";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Chatroom.css";

const ChatRoom = () => {
  const { roomId } = useParams(); // Gets roomId from URL
  const { userId } = useContext(Context);
  const [chatroomData, setChatroomData] = useState();
  const { register, handleSubmit, reset } = useForm();
  const getData = useCallback(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/chatrooms/${roomId}`
      );
      setChatroomData(data);
    })()
  }, [roomId]);
  useEffect(() => {
    const intervalId = setInterval(getData, 1000);
    return () => clearInterval(intervalId);
  }, [getData]);

  return (
    <div className="Chatroom">
      <h1 className="Chatroom__title">Room: {chatroomData && chatroomData.name}</h1>
      <div className="Chatroom__message-list">
        {chatroomData ? chatroomData.messages.map(({ _id, content, user }) => (
          <div className={userId === user._id ? "message__self" : "message__other"} key={_id}>
            <div className="user">{user.name}</div>
            <div className="content">
              <div className="text">{content}</div>
            </div>
          </div>
        )) : 'Loading...'}
      </div>
      <form className="new-message" onSubmit={handleSubmit(async ({ newMessage }) => {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/chatrooms/${roomId}/messages/create`,
          { content: newMessage, userId });
        getData();
        reset();
        // TODO: socket
      })}>
        <textarea
          placeholder="Write message..."
          className="new-message-input-field"
          {...register('newMessage', { required: true })}
        />
        <button className="send-message-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
