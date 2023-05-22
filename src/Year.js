import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useMemo, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const locales = {
  "en-GB": require("date-fns/locale/en-GB"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const months = [
  {
    id: 1,
    name: "January",
    dateFrom: new Date("2023, 1, 1"),
    dateTo: new Date("2023, 1, 31"),
  },
  {
    id: 2,
    name: "February",
    dateFrom: new Date("2023, 2, 1"),
    dateTo: new Date("2023, 2, 27"),
  },
  {
    id: 3,
    name: "March",
    dateFrom: new Date("2023, 3, 1"),
    dateTo: new Date("2023, 3, 31"),
  },
  {
    id: 4,
    name: "April",
    dateFrom: new Date("2023, 4, 1"),
    dateTo: new Date("2023, 4, 30"),
  },
  {
    id: 5,
    name: "May",
    dateFrom: new Date("2023, 5, 1"),
    dateTo: new Date("2023, 5, 31"),
  },
  {
    id: 6,
    name: "June",
    dateFrom: new Date("2023, 6, 1"),
    dateTo: new Date("2023, 6, 30"),
  },
  {
    id: 7,
    name: "July",
    dateFrom: new Date("2023, 7, 1"),
    dateTo: new Date("2023, 7, 31"),
  },
  {
    id: 8,
    name: "August",
    dateFrom: new Date("2023, 8, 1"),
    dateTo: new Date("2023, 8, 31"),
  },
  {
    id: 9,
    name: "September",
    dateFrom: new Date("2023, 9, 1"),
    dateTo: new Date("2023, 9, 30"),
  },
  {
    id: 10,
    name: "October",
    dateFrom: new Date("2023, 10, 1"),
    dateTo: new Date("2023, 10, 31"),
  },
  {
    id: 11,
    name: "November",
    dateFrom: new Date("2023, 11, 1"),
    dateTo: new Date("2023, 11, 30"),
  },
  {
    id: 12,
    name: "December",
    dateFrom: new Date("2023, 12, 1"),
    dateTo: new Date("2023, 12, 31"),
  },
];

function MyCalendar(props) {
  let events = props.allEvents;
  return (
    <Grid container direction={"wrap"}>
      <Grid item xs={12} marginBottom={4} marginTop={2}>
        <Typography fontSize={"1.5rem"} fontWeight={"500"}>
          YEAR OVERVIEW
        </Typography>
      </Grid>
      {months.map((month) => {
        return (
          <Grid
            item
            xs={12}
            md={4}
            container
            key={month.id}
            direction="column"
            alignItems={"center"}
          >
            <Grid item>{month.name}</Grid>
            <Grid item>
              <Calendar
                localizer={localizer}
                selectable={false}
                startAccessor="start"
                // onSelectSlot={onSelectSlot}
                endAccessor="end"
                toolbar={false}
                date={month.dateFrom}
                style={{ height: 300, width: 300, margin: "50px" }}
                defaultView="month"
                events={events}
                eventPropGetter={(event) => {
                  const eventData = events.find(
                    (ot) => ot.title === event.title
                  );

                  const backgroundColor = eventData && eventData.color;

                  return { style: { backgroundColor } };
                }}
              />
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default MyCalendar;
