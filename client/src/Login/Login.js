import axios from "axios";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useState, useContext } from "react"
import { UserContext } from "../contexts/user";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

function Login() {
  const history = useHistory();
  const { setUserId } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [isLogin, setIsLogin] = useState(true);
  const login = async ({ name, password }) => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/users/` + (isLogin ? 'login' : 'create'),
      { name, password }
    )
    setUserId(data._id);
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
                  {isLogin ? 'Log in!' : 'Sign up!'}
                </Button>
              </InputGroup>
              {errors.name && (
                <Form.Text>You need to input your name</Form.Text>
              )}
            </Form>
          </Col>
        </Row>
        <Button onClick={() => setIsLogin(s => !s)}>
          Switch!
        </Button>
      </Container>
    </div>
  );
}

export default Login;
