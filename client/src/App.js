import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ChatRoom from "./ChatRoom/ChatRoom";
import Login from "./Login/Login";
import Menu from "./Menu/Menu";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/:roomId" component={ChatRoom} />
      </Switch>
    </Router>
  );
}

export default App;
