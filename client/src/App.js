import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login/Login";
import Menu from "./Menu/Menu";
import ChatRoom from "./ChatRoom/ChatRoom";
import Create from "./CreateRoom/Create";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/chatroom/:roomId" component={ChatRoom} />
      </Switch>
    </Router>
  );
}

export default App;
