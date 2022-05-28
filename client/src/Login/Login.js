import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Stack
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  function emptyCheck() {
    if (username === "") {
      setWarning("You need to input your username");
      return true;
    } else if (password === "") {
      setWarning("You need to input your password");
      return true;
    }
    return false;
  }

  return (
    <div className="Login">
      <Container>
        <Stack gap={2} className="col-md-5 mx-auto">
          <h1>CNL 2022 Final</h1>
          <Row>
            <Col>
              <InputGroup>
                <Form.Control
                  placeholder="Enter your username"
                  onChange={handleUsernameChange}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  onChange={handlePasswordChange}
                />
              </InputGroup>
            </Col>
          </Row>

          <Form.Text style={{ color: "red" }}>{warning}</Form.Text>

          <Button
            onClick={() => {
              if (emptyCheck()) {
                console.log(warning);
              } else {
                history.push("menu");
              }
            }}
          >
            Log in!
          </Button>
        </Stack>
      </Container>
    </div>
  );
}

export default Login;
