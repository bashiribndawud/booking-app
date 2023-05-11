import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import BookingAddress from "../components/BookingAddress";
import BookingGallery from "./BookingGallery";
import BookingDate from "../components/BookingDate";
const SingleBooking = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const response = axios
      .get("/bookings", { headers: { Authorization: `bearer ${token}` } })
      .then((resp) => {
        const foundBooking = resp.data.find(({ _id }) => _id === id);
        setBooking(foundBooking);
        console.log(foundBooking);
        setLoading(true);
      });
  }, [id]);
  if (!loading) {
    return <Loader />;
  }
  return (
    <div className="my-8">
      {" "}
      <h1 className="text-3xl font-semibold">{booking.placeId.title}</h1>
      <BookingAddress place={booking.placeId} />
      <div className="bg-gray-200 p-4 mb-4 rounded-2xl flex justify-between items-center">
        <div>
          <h2 className="text-xl">Your Booking Information</h2>
          <BookingDate booking={booking} />
        </div>
        <div className="bg-primary p-4 rounded-2xl text-white">
          <div>Total price</div>
          <p className="font-semibold text-3xl">${booking.price}</p>
        </div>
      </div>
      <BookingGallery place={booking.placeId} />
    </div>
  );
};

export default SingleBooking;
