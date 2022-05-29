import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Badge, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

const Home = () => {
  const history = useHistory();
  const [chatrooms, setChatrooms] = useState([]);
  useEffect(() => {
    (async () => {
      const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/chatrooms`)
      setChatrooms(data)
    })()
  }, []);

  console.log(chatrooms)

  // const fakeData = [
  //   { name: "Chat Room 1", subtitle: "For working", unread: 10, Id: 123 },
  //   { name: "Chat Room 1", subtitle: "For working", unread: 10, Id: 345 },
  //   { name: "Chat Room 1", subtitle: "For working", unread: 10, Id: 567 },
  //   { name: "Chat Room 1", subtitle: "For working", unread: 10, Id: 897 }
  // ];

  const Li = chatrooms.map(chatroom => (
    <ListGroup.Item
      action
      as="li"
      className="d-flex justify-content-between align-items-start"
      onClick={() => history.push(chatroom._id.toString())}
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{chatroom.name}</div>
        {/* {chatroom.subtitle} */}
      </div>
      <Badge bg="primary" pill>
        {10}
      </Badge>
    </ListGroup.Item>
  ));

  const { register, handleSubmit } = useForm();

  return (
    <>
      <ListGroup as="ol" numbered>
        {Li}
      </ListGroup>
      <Form onSubmit={handleSubmit(async ({name}) => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/chatrooms/create`, { name })
      })}>
        <Form.Control placeholder="new chatroom name" {...register('name', {required: true})} />
        <Button type="submit">Add chatroom</Button>
      </Form>
    </>
  );
};

export default Home;
