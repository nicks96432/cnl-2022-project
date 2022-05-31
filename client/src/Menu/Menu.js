import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/user";

import "./Menu.css";

const Home = () => {
  const history = useHistory();
  const [chatrooms, setChatrooms] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/chatrooms`
      );
      setChatrooms(data);
    })();
  }, []);

  useEffect(() => {
    console.log(chatrooms);
  }, [chatrooms]);

  const inputRef = useRef(null);

  const fakeData = [
    { name: "Chat Room 1", admins: [], _id: 123 },
    { name: "Chat Room 2", admins: [], _id: 345 },
    { name: "Chat Room 3", admins: [], _id: 567 },
    { name: "Chat Room 4", admins: [], _id: 897 }
  ];

  const Li = fakeData.map((chatroom, index) => (
    <div
      className="Menu__chatroom__item"
      key={index}
      onClick={() => history.push(chatroom._id.toString())}
    >
      <div className="Menu__chatroom__item__name">{chatroom.name}</div>
    </div>
  ));

  const { userId } = useContext(UserContext);
  return (
    <div className="Menu">
      <div className="Menu__title">Chatroom List</div>
      <div className="Menu__chatroom">
        {Li.length === 0 ? <div>empty...</div> : Li}
      </div>
      <div className="Menu__input-group">
        <input
          className="Menu__input"
          placeholder="new chatroom name"
          ref={inputRef}
        />
        <button
          className="Menu__button"
          onClick={async () => {
            await axios.post(
              `${process.env.REACT_APP_BACKEND_URL}/chatrooms/create`,
              { name: inputRef.current.value, userId }
            );
          }}
        >
          Add chatroom
        </button>
      </div>
    </div>
  );
};

export default Home;
