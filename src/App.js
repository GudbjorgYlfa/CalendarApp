import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import Grid from "@mui/material/Grid";
import { CirclePicker } from "react-color";
import Year from "./Year";
import { Button, TextField, Typography } from "@mui/material";

const locales = {
  "en-GB": require("date-fns/locale/en-GB"),
};
const localiser = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2023, 6, 10),
    end: new Date(2023, 6, 10),
    color: "#cddc39",
  },
  {
    title: "Vacation",
    start: new Date(2023, 6, 7),
    end: new Date(2023, 6, 10),
    color: "#673ab7",
  },
  {
    title: "Conference",
    start: new Date(2023, 6, 20),
    end: new Date(2023, 6, 23),
    color: "#009688",
  },
];

function App() {
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    color: "",
  });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
    console.log(newEvent.color);
  }

  return (
    <Grid
      container
      className="App"
      direction={"column"}
      padding={5}
      justifyContent={"center"}
    >
      <Grid item className="block-tile" marginBottom={2}>
        <Typography fontSize={"1.5rem"} fontWeight={"500"}>
          CALENDAR
        </Typography>
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        justifyContent={"space-evenly"}
        className="block-tile"
      >
        {/* <Grid item>
          <Typography fontSize={"1rem"} fontWeight={"500"}>
            Add new Event
          </Typography>
        </Grid> */}
        <Grid item xs={12} md={4}>
          <TextField
            label="Add a new Event"
            size="small"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
            fullWidth
          />
        </Grid>

        <Grid item>
          <DatePicker
            placeholderText="Start Date"
            className="datepicker"
            style={{ marginRight: "10px" }}
            selected={newEvent.start}
            onChange={(start) => setNewEvent({ ...newEvent, start })}
            dateFormat="dd/MM/yy"
          />
        </Grid>
        <Grid item>
          <DatePicker
            className="datepicker"
            placeholderText="End Date"
            selected={newEvent.end}
            onChange={(end) => setNewEvent({ ...newEvent, end })}
            dateFormat="dd/MM/yy"
          />
        </Grid>
        <Grid item>
          <CirclePicker
            onChangeComplete={(e) => setNewEvent({ ...newEvent, color: e.hex })}
            // value={newEvent.color}
          />
        </Grid>
        <Grid item>
          <Button onClick={handleAddEvent} variant="outlined" color="primary">
            Add Event
          </Button>
        </Grid>
      </Grid>
      <Grid item marginTop={2} className="block-tile">
        <Calendar
          localizer={localiser}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "50px" }}
          eventPropGetter={(event) => {
            const eventData = allEvents.find((ot) => ot.title === event.title);

            const backgroundColor = eventData && eventData.color;

            return { style: { backgroundColor } };
          }}
        />
      </Grid>
      <Grid item className="block-tile" marginTop={2}>
        <Year allEvents={allEvents} />
      </Grid>
    </Grid>
  );
}

export default App;
