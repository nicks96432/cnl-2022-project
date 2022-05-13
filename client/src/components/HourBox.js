import React, { useState } from "react";
import {} from "react-bootstrap";
import "../App.css";
import "../stylesheets/when2meet.scss";

const HourBox = () => {
  const [user, setUser] = useState("");
  const [date, setDate] = useState([12, 12]);
  const [time, setTime] = useState([19, 30]);
  const [isBusy, setBusy] = useState(false);

  let hoverHandler = e => {
    console.log(e);
    // TODO: 看要不要列一個表說誰這個時候沒空
    // TODO: 看stylesheets/when2meet.scss 不知道怎麼isBusy的時候hover不要變色
  };

  let clickHandler = e => {
    setBusy(~isBusy);
    // TODO: call 後端 setUser(date, time, isBusy);
  };

  return (
    <div
      className={(isBusy ? "busy " : "") + "hour"}
      onClick={clickHandler}
    ></div>
  );
  // TODO: 好像要改 onMouseDown, 然後把事件在上層table做掉, 才能用拖曳選取
};

export default HourBox;
