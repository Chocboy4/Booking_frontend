import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from 'date-fns';
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookThisPlace() {
    // Check if the user is logged in
    if (!user) {
      setRedirect('/login');
      return;
    }
  
    // Validate the fields
    if (!checkIn) {
      setErrorMessage("Please fill in the Check In date.");
      return;
    }
    if (!checkOut) {
      setErrorMessage("Please fill in the Check Out date.");
      return;
    }
    if (!numberOfGuests || numberOfGuests <= 0) {
      setErrorMessage("Please enter a valid number of guests.");
      return;
    }
    if (!name.trim()) {
      setErrorMessage("Please fill in your name.");
      return;
    }
    if (!phone.trim()) {
      setErrorMessage("Please fill in your phone number.");
      return;
    }
  
    try {
      // Step 1: Send a request to the backend to initiate the transaction
      const amount = numberOfNights * place.price * 100;  // Convert amount to kobo
      const response = await axios.post('/initiate-transaction', {
        email: user.email,
        amount,  // Paystack expects the amount in kobo
      });
  
      // Step 2: Redirect the user to Paystack payment page
      const { authorization_url } = response.data;
      window.location.href = authorization_url;
    } catch (error) {
      console.error('Error initiating payment:', error);
      setErrorMessage("An error occurred while making the booking. Please try again.");
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: #{place.price} per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check In</label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check Out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full Name:</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Your phone number:</label>
            <input
              type="tel"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </div>
        )}
      </div>
      {errorMessage && (
        <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
      )}
      <button onClick={bookThisPlace} className="primary">
        Book this Place
        {numberOfNights > 0 && (
          <span>
            #{numberOfNights * place.price}
          </span>
        )}
      </button>
    </div>
  );
}
