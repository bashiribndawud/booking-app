import React from "react";
import { useUserContext } from "../context/userContext";
import { Navigate, Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
import PlacesPage from "./PlacesPage";
const Account = () => {
  const { subpage, actionOrId } = useParams();
  const {
    state: { user },
    ready, dispatch
  } = useUserContext();
  if (!ready) {
    return <Loader />;
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }
  function getLinkClasses(type = null) {
    let classes = `${
      subpage === type ? "bg-primary" : "bg-gray-300"
    } py-2 px-4 rounded shadow-lg hover:rounded-full inline-flex gap-2`;
    return classes;
  }
  function handleLogOut(){
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem('token')
  }
  return (
    <div>
      <nav className="w-full flex mt-4 gap-2 justify-center">
        <Link className={getLinkClasses("profile")} to={"/account/profile"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          Profile
        </Link>
        <Link className={getLinkClasses("bookings")} to={"/account/bookings"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          My Bookings
        </Link>{" "}
        <Link to={"/account/places"} className={getLinkClasses("places")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
            />
          </svg>
          My Accomodation
        </Link>
      </nav>

      {subpage === "profile" && (
        <div className="mx-auto text-center max-w-lg">
          <p className="my-3">
            <span className="py-1 bg-green-500 text-white rounded">
              Sign in with
            </span>{" "}
            {user.email}
          </p>
          <button type="button" className="primary" onClick={handleLogOut}>
            Sign Out
          </button>
        </div>
      )}

      {subpage === "bookings" && <div>Bookings</div>}

      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default Account;
