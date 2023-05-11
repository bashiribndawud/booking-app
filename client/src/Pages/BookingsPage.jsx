import React, { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import {Link} from "react-router-dom"
import axios from "axios";
import Loader from "../components/Loader";
import { differenceInCalendarDays, format } from "date-fns";
import BookingDate from "../components/BookingDate";

const BookingsPage = () => {
  const token = localStorage.getItem("token");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const source = axios.CancelToken.source();
    async function getAllBookings() {
      const { data, status } = await axios.get("/bookings", {
        headers: { Authorization: `bearer ${token}` },
      });
      console.log(data);
      setBookings(data);
      setLoading(true);
    }

    getAllBookings();
    return () => {
      source.cancel("Component unmounted");
    };
  }, []);

  if (!loading) {
    return <Loader />;
  }
  return (
    <div>
      <AccountNav />
      <div>
        {bookings.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={`/account/booking/${booking._id}`}
              key={booking._id}
              className="flex gap-4 bg-gray-200 mt-8 rounded-2xl overflow-hidden"
            >
              <img
                src={`http://localhost:8000/getfiles/uploads/${booking.placeId.addedPhotos[0]}`}
                alt=""
                className="w-[15rem]"
              />

              <div className="py-3 grow">
                <h2 className="font-semibold text-2xl mb-2">
                  {booking.placeId.title}
                </h2>{" "}
                <BookingDate booking={booking} />
                <div className="text-xl font-semibold flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                  Total Price: ${booking.price}
                  <br />
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
