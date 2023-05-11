import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useUserContext } from "../context/userContext";
import toast, { Toaster } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const IndexPage = () => {
  const {
    state: { user },
  } = useUserContext();
  const token = localStorage.getItem("token");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const source = axios.CancelToken.source();
    toast.success(`Welcome ${user?.name}`)
    const getAllPlaces = async () => {
      const { data } = await axios.get("/places");
      if (data) {
        setPlaces(data);
        setLoading(true);
      }
    };

    getAllPlaces();
    return () => {
      source.cancel("Component unmounted");
    };
  }, []);

  // if (!token) {
  //   return <Navigate to={"/login"} />;
  // }

  if (!loading) {
    return <Loader />;
  }
  return (
    <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-8 gap-8 mt-8">
      <Toaster position="top-right" reverseOrder="false"></Toaster>
      {places.length > 0 &&
        places.map((place) => (
          <Link to={`/place/${place._id}`} className="relative">
            <div className="bg-gray-500 rounded-2xl relative flex">
              {place.addedPhotos?.[0] && (
                <img
                  src={`http://localhost:8000/getFiles/uploads/${place.addedPhotos[0]}`}
                  alt=""
                  className="rounded-2xl h-[12rem] w-full object-cover"
                />
              )}
              <div className="absolute top-2 right-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </div>
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm truncate leading-4 text-gray-500">
              {place.title}4
            </h3>
            <div className="mt-1">
              <span className="font-bold">${place?.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
