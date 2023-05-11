import React from "react";
import { useUserContext } from "../context/userContext";
import { Navigate, Link, useParams, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import AccountNav from "../components/AccountNav";
const ProfilePage = () => {
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
  }
  return (
    <div>
     <AccountNav />
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
    </div>
  );
};

export default ProfilePage;
