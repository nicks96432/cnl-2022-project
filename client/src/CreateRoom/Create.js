import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Stack } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const [roomId, setroomId] = React.useState("");
  const [warning, setWarning] = React.useState("");
  const handleroomIdChange = event => {
    setroomId(event.target.value);
  };

  return (
    <Stack gap={2} className="col-md-5 mx-auto">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label
            style={{
              marginTop: 150,
              fontSize: 20,
              fontWeight: "bold"
            }}
          >
            Create A Chatroom{" "}
          </Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Please enter room ID</Form.Label>
          <Form.Control
            type="input"
            placeholder="Enter your room ID"
            onChange={handleroomIdChange}
          />
          <Form.Label style={{ color: "red" }}>{warning}</Form.Label>
        </Form.Group>

        <Button
          variant="primary"
          onClick={() => {
            if (/*room exist*/ false) {
            } else if (roomId === "") {
              setWarning("Empty Room ID");
            } else {
              history.push("chatroom/" + roomId.toString());
            }
          }}
        >
          Create !
        </Button>
      </Form>
    </Stack>
  );
};

export default Home;
