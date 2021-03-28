import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

const Bookings = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/bookings?email=${loggedInUser.email}`)
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, [loggedInUser.email]);
  return (
    <div>
      <h4>Your bookings...</h4>
      {bookings.map((booking) => (
        <li key={booking._id}>
          {booking.name}, {booking.email} from{" "}
          {new Date(booking.checkInDate).toDateString("dd/MM/yyyy")} to{" "}
          {new Date(booking.checkOutDate).toDateString("dd/MM/yyyy")}
        </li>
      ))}
    </div>
  );
};

export default Bookings;
