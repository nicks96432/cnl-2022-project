import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Chatroom from "./Chatroom";
import Context from "./Context";
import Login from "./Login";
import Menu from "./Menu";

function App() {
  const [userId, setUserId] = useState("");

  return (
    <Context.Provider value={{ userId, setUserId }}>
      <Router>
        <Routes>
          <Route path="/menu" element={<Menu />} />
          <Route path="/:roomId" element={<Chatroom />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </Context.Provider>
  );
}

export default App;
