import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/user";

import "./Login.css";

const Login = () => {
  const history = useHistory();
  const { setUserId } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/users/${
      isLogin ? "login" : "create"
    }`;
    const { data } = await axios.post(url, { name, password });
    console.log(data);
    setUserId(data._id);
    history.push("menu");
  };

  return (
    <div className="Login">
      <div className="Login__title">CNL 2022 Final</div>
      <div className="Login__form">
        <div className="Login__input-group">
          <input
            className="Login__input"
            placeholder="username"
            onChange={e => setName(e.target.value)}
          />
          <input
            className="Login__input"
            placeholder="password"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="Login__input-group">
          <button className="Login__button" onClick={login}>
            {isLogin ? "ログイン!" : "サインアップ!"}
          </button>
          <button className="Login__button" onClick={() => setIsLogin(s => !s)}>
            スウィッチ!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
