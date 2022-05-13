import React, { useState } from "react";
import {
  Form,
  Button,
  InputGroup,
  Row,
  DropdownButton,
  Dropdown
} from "react-bootstrap";
import "../App.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

const DATE_EXTENSION = 7;

const CreateEvent = () => {
  let startDate = new Date(),
    endDate = new Date();
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection"
  };
  const [username, setUsername] = useState("");
  const [dateRange, setDateRange] = useState(selectionRange);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(24);

  let time_choices = [...Array(25).keys()];
  let handleStartTime = time => {
    console.log(`Start time: ${time}`);
    setStartTime(time);
  };
  let handleEndTime = time => {
    console.log(`End time: ${time}`);
    setEndTime(time);
  };

  let handleDate = ({ selection }) => {
    console.log(selection);
    setDateRange({
      startDate: selection.startDate,
      endDate: selection.endDate,
      key: selection.key
    });
    console.log(`Current Date Range:`, dateRange);
  };

  return (
    <div className="App">
      <div className="App-title">
        <h1>Create new event</h1>
      </div>
      <div>
        <Form>
          <Row>
            <Form.Label>Event Name</Form.Label>
            <InputGroup placeholder="Event Name"></InputGroup>

            <Form.Label>What dates might work?</Form.Label>
            <InputGroup>
              <DateRangePicker
                minDate={startDate}
                ranges={[dateRange]}
                onChange={handleDate}
              ></DateRangePicker>
            </InputGroup>
            <Button variant="outline-secondary">Today</Button>
          </Row>
          <Form.Label>What times might work?</Form.Label>
          <DropdownButton
            id="dropdown-basic-button"
            title="No earlier than:"
            onSelect={handleStartTime}
          >
            {time_choices.map(time => (
              <Dropdown.Item eventKey={time}>{time}:00</Dropdown.Item>
            ))}
          </DropdownButton>
          <DropdownButton
            id="dropdown-basic-button"
            title="No later than:"
            onSelect={handleEndTime}
          >
            {time_choices.map(time => (
              <Dropdown.Item eventKey={time}>{time}:00</Dropdown.Item>
            ))}
          </DropdownButton>
        </Form>
      </div>
    </div>
  );
};

export default CreateEvent;
