import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useFormik, Field } from "formik";
import { ValidateNewPlaces } from "../utils/validator";
import toast, { Toaster } from "react-hot-toast";
import Perks from "../components/Perks";
import axios from "axios";
import PhotoUploader from "../components/PhotoUploader";
import { addNewPlace } from "../utils/apis";

const PlacesPage = () => {
  const { actionOrId } = useParams();
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photolink, setPhotolink] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [maxguest, setMaxguest] = useState(1);

  async function addPhotoByLink(e) {
    e.preventDefault();
    try {
      const { status, data: filename } = await axios.post("/upload-by-link", {
        link: photolink,
      });
      if (status === 201) {
        toast.success("Photo Saved");
      }
      setAddedPhotos((prePhoto) => {
        return [...prePhoto, filename];
      });
      setPhotolink("");
    } catch (error) {
      console.log(error);
    }
  }

  function handleFileUpload(evt) {
    const files = evt.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data } = response;
        data.map((data) => {
          const { filename } = data;
          setAddedPhotos((prevPhoto) => {
            return [...prevPhoto, filename];
          });
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  async function handleAddNewPlace(e) {
    e.preventDefault();

    const newPlaceData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkout,
      checkin,
      maxguest,
    };
    
    const newPlacePromise = addNewPlace(newPlaceData)
    toast.promise(newPlacePromise, {
      loading: <b>Creating New Place</b>,
      success: <b>New Place Created</b>,
      error: <b>Unable to create</b>
    })
    newPlacePromise.then(status => {
      if (status === 201) {
        toast.success('Hurray!!!')
      }
    }).catch(error => console.log(error))
  }

  return (
    <div>
      <Toaster position="top-right" reverseOrder="false"></Toaster>
      <div className="relative">
        {actionOrId !== "new" && (
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
        )}

        {actionOrId === "new" && (
          <div className="max-w-[80%] mx-auto">
            <form className="mt-5 mb-5" onSubmit={handleAddNewPlace}>
              <label htmlFor="title" className="ml-5 text-xl text-gray-500">
                Title
              </label>
              <p className="text-sm ml-5 text-gray-500">
                Title should be short, descriptive and catchy
              </p>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title*"
              />
              <label htmlFor="address" className="ml-5 text-xl text-gray-500">
                Address
              </label>
              <p className="text-sm ml-5 text-gray-500">Address to the place</p>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Address*"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <PhotoUploader
                photolink={photolink}
                setPhotolink={setPhotolink}
                addedPhotos={addedPhotos}
                handleFileUpload={handleFileUpload}
                addPhotoByLink={addPhotoByLink}
              />

              <div className="flex flex-col mt-3">
                <label
                  htmlFor="description"
                  className="ml-5 text-xl text-gray-500"
                >
                  Description
                </label>
                <p className="text-sm ml-5 text-gray-500">
                  description to the place
                </p>
                <textarea
                  name="description"
                  id="description"
                  cols="30"
                  rows="5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border rounded ml-5"
                ></textarea>
              </div>

              <div className="ml-5">
                <h2 className="text-xl text-gray-500">Perks</h2>
                <p className="text-sm text-gray-500">
                  select all the perks of your place
                </p>
                <Perks selected={perks} onChange={setPerks} />
              </div>

              <div className="ml-5 my-5">
                <h2 className="text-xl text-gray-500">Extra Info</h2>
                <p className="text-sm text-gray-500">House rules, etc</p>
                <textarea
                  name="extraInfo"
                  id="extraInfo"
                  cols="30"
                  rows="5"
                  value={extraInfo}
                  onChange={(e) => setExtraInfo(e.target.value)}
                  className="w-full border rounded-md"
                ></textarea>
              </div>

              <div className="ml-5 my-5">
                <h2 className="text-xl text-gray-500">
                  Check in&out times, max guest
                </h2>
                <p className="text-sm text-gray-500">
                  add check in and out times, remember to have some time
                  cleaning the windows between guests
                </p>
                <div className="grid sm:grid-cols-3 gap-2">
                  <div>
                    <h3>Check in time</h3>
                    <input
                      type="text"
                      name="checkin"
                      id="checkin"
                      placeholder="14:00"
                      value={checkin}
                      onChange={(e) => setCheckin(e.target.value)}
                    />
                  </div>
                  <div>
                    <h3>Check out time</h3>
                    <input
                      type="text"
                      name="checkout"
                      id="checkout"
                      placeholder="22:00"
                      value={checkout}
                      onChange={(e) => setCheckout(e.target.value)}
                    />
                  </div>
                  <div>
                    <h3>Max numbers guests</h3>
                    <input
                      type="text"
                      name="maxguest"
                      id="maxguest"
                      placeholder="07"
                    />
                  </div>
                </div>
              </div>
              <div className="mx-auto text-center">
                <button
                  type="submit"
                  className="bg-primary w-[50%] p-2 rounded-lg text-white shadow-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacesPage;
