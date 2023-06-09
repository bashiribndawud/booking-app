import React from "react";
import { useUserContext } from "../context/userContext";
import { Navigate, Link, useParams, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";
import ProfilePage from "./ProfilePage";
import BookingPage from "./BookingsPage";
const Account = () => {
  const { pathname } = useLocation();
  const path = pathname.slice("/")[2];
  const {
    state: { user },
    ready,
    dispatch,
  } = useUserContext();
  if (!ready) {
    return <Loader />;
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }
  function handleLogOut() {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
  }
  return (
    <div>
      <AccountNav />

      {path === "profile" && <ProfilePage />}

      {path === "bookings" && <BookingPage />}

      {path === "places" && <PlacesPage />}
    </div>
  );
};

export default Account;
