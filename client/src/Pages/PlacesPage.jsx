import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useFormik, Field } from "formik";
import { ValidateNewPlaces } from "../utils/validator";
import toast, { Toaster } from "react-hot-toast";
import Perks from "../components/Perks";
import axios from "axios";
import PhotoUploader from "../components/PhotoUploader";
import { addNewPlace } from "../utils/apis";
import NewPlaceForm from "./NewPlaceForm";
import AccountNav from "../components/AccountNav";
import Loader from "../components/Loader";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  function handleRemoveImage() {console.log('Remove')}

  useEffect(() => {
    let source = axios.CancelToken.source();
    const getAllPlacess = async () => {
      const { data } = await axios.get("/user-allplaces", {
        headers: { Authorization: `bearer ${token}` },
      });
      setPlaces([...data]);
      setLoading(true);
      console.log(places);
    };
    getAllPlacess();

    return () => {
      source.cancel("Component unmounted");
    };
  }, []);

  if (!loading) {
    return <Loader />;
  }

  return (
    <div>
      <Toaster position="top-right" reverseOrder="false"></Toaster>
      <AccountNav />
      <div className="relative mt-3">
        <Link
          className="absolute right-3 bg-primary rounded-lg shadow-lg text-white p-2 hover:scale-[1.1] flex gap-2"
          to={"/account/places/new"}
        >
          Add New Place{" "}
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Link>
      </div>
      <div className=" mt-[4rem] mx-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={`/account/places/${place._id}`}
              className="bg-gray-100 p-4 rounded-2xl my-2 flex gap-2"
              key={place._id}
            >
              <div className="flex w-32 h-32 shrink-0">
                <img
                  src={`http://localhost:8000/getFiles/uploads/${place.addedPhotos[0]}`}
                  alt="Not found"
                  className="object-cover w-full"
                />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place?.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
