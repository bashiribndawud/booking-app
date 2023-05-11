import React, { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useUserContext } from "../context/userContext";
const BookingWidgets = ({ place }) => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const navigate = useNavigate();
  const {state: {user}} = useUserContext()
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckout] = useState("");
  const [numberOfGuest, setNumberOfGuest] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  let numbersOfNights = 0;
  if (checkIn && checkOut) {
    numbersOfNights = differenceInCalendarDays(
      new Date(checkIn),
      new Date(checkOut)
    );
    numbersOfNights *= place.price;
  }

  async function handleBooking(e) {
    e.preventDefault();
    const newBooking = {
      checkIn,
      checkOut,
      numberOfGuest,
      name,
      email,
      phone,
      placeId: id,
      price: numbersOfNights,
    };
    const {
      data: { msg },
      status,
    } = await axios.post("/booking", newBooking, {
      headers: { Authorization: `bearer ${token}` },
    });
    if (status === 201) {
      navigate("/indexPage");
      toast.success(msg);
    }
  }
  useEffect(() => {
    if(user){
      setName(user.name)
    }
  }, [user])
  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr] mt-4">
        <div>
          <div className="my-4">
            <h2 className="font-bold text-2xl">Description</h2>
            {place?.description}
          </div>
          Check-in: {place.checkin} <br /> Check-out: {place?.checkout} <br />{" "}
          Max-guest: {place?.maxGuest}
        </div>
        <form onSubmit={handleBooking}>
          <div className="bg-white shadow-lg p-4 rounded-2xl w-fit">
            <div className="text-2xl text-center font-semibold">
              Price: ${place?.price} / per night
            </div>
            <div className="border flex flex-col items-center rounded-2xl my-2 px-4">
              {" "}
              <div className="flex items-center">
                <div className="rounded-2xl py-3 px-4">
                  <label htmlFor="">Checkin:</label> <br />
                  <input
                    className="bg-transparent"
                    type="date"
                    name="checkin"
                    id="checkin"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
                <div className="my-2 rounded-2xl py-3 px-4">
                  <label htmlFor="">Checkout:</label> <br />
                  <input
                    className="bg-transparent"
                    type="date"
                    name="checkout"
                    id="checkout"
                    value={checkOut}
                    onChange={(e) => setCheckout(e.target.value)}
                  />
                </div>
              </div>
              <label htmlFor="numberofguest" className="">
                Number of guests
              </label>{" "}
              <input
                type="text"
                name="numberofguest"
                id="numberofguest"
                className="mr-3"
                value={numberOfGuest}
                onChange={(e) => setCheckout(e.target.value)}
              />
              {checkOut && checkIn && (
                <div className="">
                  <label htmlFor="fullname">Full Name:</label>
                  <input
                    type="text"
                    name="name"
                    id="fullname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              )}
            </div>

            <button
              className="bg-primary w-full p-2 rounded-2xl text-white mt-1"
              type="submit"
            >
              Book this place
              {numbersOfNights !== 0 ? numbersOfNights : ""}
            </button>
          </div>
        </form>
      </div>
      <div className="text-md border-t text-gray-700 mt-8 bg-white py-8 shadow-lg w-fit text-justify px-8 -mx-8">
        <h3 className="text-xl text-black font-bold text-justify">
          Extra Info
        </h3>
        <p className="leading-5 mb-4 text-gray-700 text-lg">
          {place.extraInfo}
        </p>
      </div>
    </>
  );
};

export default BookingWidgets;
