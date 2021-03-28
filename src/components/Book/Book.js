import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Button } from "@material-ui/core";
import Bookings from "../Bookings/Bookings";

const Book = () => {
  const { bedType } = useParams();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  //! To add an extra day
  //   const date = new Date();
  // // add a day
  // date.setDate(date.getDate() + 1);
  const date = new Date();
  const [selectedDate, setSelectedDate] = useState({
    checkInDate: new Date(),
    checkOutDate: date.setDate(date.getDate() + 3),
  });

  const handleCheckInDate = (date) => {
    const newDates = { ...selectedDate };
    newDates.checkInDate = date;
    setSelectedDate(newDates);
  };

  const handleCheckOutDate = (date) => {
    const newDates = { ...selectedDate };
    newDates.checkOutDate = date;
    setSelectedDate(newDates);
  };

  const handleBooking = () => {
    const newBookings = { ...loggedInUser, ...selectedDate };
    fetch("http://localhost:5000/addBookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBookings),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>
        {" "}
        Hey {loggedInUser.name}! Let's book a {bedType} Room.
      </h1>
      <p>
        Want a <Link to="/home">different room?</Link>{" "}
      </p>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            //! these are quite interesting
            // disableToolbar
            // variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Check In Date"
            value={selectedDate.checkInDate}
            onChange={handleCheckInDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Check Out Date"
            format="dd/MM/yyyy"
            value={selectedDate.checkOutDate}
            onChange={handleCheckOutDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
        <Button onClick={handleBooking} variant="contained" color="primary">
          Book Now
        </Button>
      </MuiPickersUtilsProvider>
      <Bookings></Bookings>
    </div>
  );
};

export default Book;
