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
  const login = ({ username }) => {
    console.log(username);
    console.log(errors);
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
                  {...register("username", {
                    required: true
                  })}
                />
                <Button type="submit" onClick={() => history.push("menu")}>
                  Log in!
                </Button>
              </InputGroup>
              {errors.username && (
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
