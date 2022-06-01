import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../Context";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { setUserId } = useContext(Context);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const login = async isLogin => {
    let response;
    try {
      response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/${
          isLogin ? "login" : "create"
        }`,
        { name, password }
      );
    } catch (e) {
      if (isLogin) alert("Log in failed: username or password incorrect");
      else alert("Sign up failed: account exists");
      return;
    }
    setUserId(response.data._id);
    navigate("/menu");
  };

  return (
    <div className="Login">
      <div className="Login__title">CNL 2022 Final</div>
      <form className="Login__form" onSubmit={e => e.preventDefault()}>
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
          <button
            type="submit"
            className="Login__button"
            onClick={() => login(true)}
          >
            Log in
          </button>
          <button
            type="submit"
            className="Login__button"
            onClick={() => login(false)}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
