import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import BookingWidgets from "./BookingWidgets";
import BookingGallery from "./BookingGallery";
import BookingAddress from "../components/BookingAddress";
const PlaceDescription = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [place, setPlace] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAllPhoto, setShowAllPhoto] = useState(false);
  useEffect(() => {
    const getplaceDetails = async () => {
      const { data } = await axios.get(`/place/${id}`, {
        headers: { Authorization: `bearer ${token}` },
      });
      setPlace(data);
      console.log(data);
      setLoading(true);
    };
    getplaceDetails();
  }, [id]);

  if (!loading) {
    return <Loader />;
  }
  function handleShowMore(e) {
    e.preventDefault();
  }
  if (showAllPhoto) {
    return (
      <div className="absolute inset-0 bg-white min-h-screen overflow-x-hidden ">
        <div className="bg-black p-8 grid gap-2">
          <div className=" flex justify-between items-center my-4">
            <h3 className="font-bold text-2xl text-white">
              Photos of {place.title}
            </h3>
            <button
              onClick={() => setShowAllPhoto(false)}
              className="flex bg-white items-center p-2 rounded-2xl border border-black text-black shadow shadow-black"
            >
              <span>Close photos</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-[1fr] gap-2">
            {place?.addedPhotos.length > 0 &&
              place.addedPhotos.map((photo) => (
                <img
                  src={`http://localhost:8000/getFiles/uploads/${photo}`}
                  className="w-full object-cover rounded-2xl"
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="bg-gray-100 -mx-8 px-8 py-8 z-10">
        <h1 className="text-3xl">{place.title}</h1>
        <BookingAddress place={place} />
        <BookingGallery place={place} setShowAllPhoto={setShowAllPhoto} />

        <BookingWidgets place={place} />
      </div>
    </>
  );
};

export default PlaceDescription;
