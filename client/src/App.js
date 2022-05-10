import logo from './logo.svg';
import './App.css';
import { Container, Form, Button, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const login = ({ username }) => {
    console.log(username);
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
        <Form onSubmit={handleSubmit(login)}>
          <InputGroup>
            <Form.Control placeholder="Enter your username" {...register('username', { required: true })} />
            <Button type="submit">Log in!</Button>
          </InputGroup>
          {errors.username && <Form.Text>You need to input your name</Form.Text>}
        </Form>
      </Container>
    </div>
  );
}

export default App;
