import { SettingsSystemDaydream } from "@material-ui/icons";
import React from "react";

const PhotoUploader = ({
  photolink,
  setPhotolink,
  addPhotoByLink,
  addedPhotos,
  handleFileUpload,
  setAddedPhotos,
}) => {
  function handleRemoveImage(link) {
    setAddedPhotos(addedPhotos.filter((photo) => photo !== link));
  }
  function selectAsMainPhoto(e,link) {
    e.preventDefault()
    setAddedPhotos([link, ...addedPhotos.filter((photo) => photo !== link)]);
  }
  return (
    <div>
      <label htmlFor="photos" className="ml-5 text-xl text-gray-500">
        Photos
      </label>
      <p className="text-sm ml-5 text-gray-500">more = better</p>
      <div className="flex items-center">
        <input
          type="text"
          name="photolink"
          id="photolink"
          placeholder="Add using link ...jpg"
          value={photolink}
          onChange={(e) => setPhotolink(e.target.value)}
          className="flex-1"
        />{" "}
        <button
          onClick={addPhotoByLink}
          className="w-auto bg-primary p-2 rounded-xl text-white flex gap-2 hover:scale-[1.1]"
        >
          Add Photo
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
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </button>
      </div>

      <div className="mt-2 grid gap-y-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full ml-5">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div className="relative w-36 h-32" key={link}>
              <img
                className="rounded-lg w-full h-full"
                src={"http://localhost:8000/getfiles/uploads/" + link}
                alt=""
              />
              <div
                className="absolute right-2 bottom-1 bg-primary  rounded shadow-lg hover:cursor-pointer p-1"
                onClick={() => handleRemoveImage(link)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>

              <button
                className="absolute left-2 bottom-1 bg-primary  rounded shadow-lg hover:cursor-pointer p-1"
                onClick={(e) => selectAsMainPhoto(e, link)}
              >
                {link === addedPhotos[0] ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4 text-white"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clip-rule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4 text-white"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                )}
              </button>
            </div>
          ))}
        <label className="border bg-transparent hover:cursor-pointer rounded-2xl p-8 text-2xl text-gray-500 ml-5 flex items-center justify-center gap-2">
          <input
            onChange={handleFileUpload}
            type="file"
            name=""
            id=""
            multiple
            className="hidden"
          />
          upload{" "}
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
              d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default PhotoUploader;
