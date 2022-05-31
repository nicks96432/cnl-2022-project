import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../Context";

import "./Menu.css";

const Home = () => {
  const navigate = useNavigate();
  const [chatrooms, setChatrooms] = useState([]);
  useEffect(() => {
    (async () => {
      let response;
      try {
        response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/chatrooms`
        );
      } catch (e) {
        console.error(`get chatrooms failed: ${e}`);
        return;
      }
      setChatrooms(response.data);
    })();
  }, []);

  const inputRef = useRef(null);

  const Li = chatrooms.map((chatroom, index) => (
    <div
      className="Menu__chatroom__item"
      key={index}
      onClick={() => navigate(`/${chatroom._id}`)}
    >
      <div className="Menu__chatroom__item__name">{chatroom.name}</div>
    </div>
  ));

  const { userId } = useContext(Context);
  if (!userId) {
    return <div>Please log in.</div>;
  }

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
            let response;
            try {
              response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/chatrooms/create`,
                { name: inputRef.current.value, userId }
              );
            } catch (e) {
              console.error(`create chatroom failed: ${e}`);
              return;
            }
            navigate(`/${response.data._id}`);
          }}
        >
          Add chatroom
        </button>
      </div>
    </div>
  );
};

export default Home;
