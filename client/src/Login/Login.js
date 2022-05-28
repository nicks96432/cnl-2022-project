import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Stack
} from "react-bootstrap";
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
    <div className="Login">
      <Container>
        <Stack gap={2} className="col-md-5 mx-auto">
          <h1>CNL 2022 Final</h1>
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
                  <Button
                    onClick={() => {
                      console.log(errors.username);
                      if (errors.username === "") {
                        console.log("Error");
                      } else {
                        history.push("menu");
                      }
                    }}
                  >
                    Log in!
                  </Button>
                </InputGroup>
                {errors.username && (
                  <Form.Text>You need to input your name</Form.Text>
                )}
              </Form>
            </Col>
          </Row>
        </Stack>
      </Container>
    </div>
  );
}

export default Login;
