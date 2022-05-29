import axios from "axios";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

function Login() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const login = async ({ name, password }) => {
    console.log({ name, password })
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/users/login`,
      { name, password }
    )
    history.push("menu")
  };

  return (
    <div className="App">
      <h1>CNL 2022 Final</h1>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit(login)}>
              <InputGroup>
                <Form.Control
                  placeholder="Enter your username"
                  {...register("name", {
                    required: true
                  })}
                />
                <Form.Control
                  placeholder="Enter your password"
                  type="password"
                  {...register("password", {
                    required: true
                  })}
                />
                <Button type="submit">
                  Log in!
                </Button>
              </InputGroup>
              {errors.name && (
                <Form.Text>You need to input your name</Form.Text>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
