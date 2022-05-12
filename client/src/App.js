import logo from './logo.svg';
import './App.css';
import { Container, Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateEvent from './components/CreateEvent';

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const login = ({ username }) => {
    console.log(username);
    console.log(errors);
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <h1>CNL 2022 Final</h1>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit(login)}>
              <InputGroup>
                <Form.Control placeholder="Enter your username" {...register('username', { required: true })} />
                <Button type="submit">Log in!</Button>
              </InputGroup>
              {errors.username && <Form.Text>You need to input your name</Form.Text>}
            </Form>
          </Col>
          <Col>
            <CreateEvent></CreateEvent>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
