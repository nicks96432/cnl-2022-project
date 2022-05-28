import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  const fakeData = [
    { name: "Chat Room 1", subtitle: "For working", unread: 10, Id: 123 },
    { name: "Chat Room 1", subtitle: "For working", unread: 10, Id: 345 },
    { name: "Chat Room 1", subtitle: "For working", unread: 10, Id: 567 },
    { name: "Chat Room 1", subtitle: "For working", unread: 10, Id: 897 }
  ];

  const Li = fakeData.map(data => (
    <ListGroup.Item
      action
      as="li"
      className="d-flex justify-content-between align-items-start"
      onClick={() => history.push(data.Id.toString())}
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{data.name}</div>
        {data.subtitle}
      </div>
      <Badge bg="primary" pill>
        {data.unread}
      </Badge>
    </ListGroup.Item>
  ));

  return (
    <ListGroup as="ol" numbered>
      {Li}
    </ListGroup>
  );
};

export default Home;
