import React from 'react'

const PhotoUploader = ({
  photolink,
  setPhotolink,
  addPhotoByLink,
  addedPhotos,
  handleFileUpload,
}) => {
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

      <div className="mt-2 grid gap-y-4 gap-x-0 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full ml-5">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div>
              <img
                className="rounded-lg w-36 h-32"
                src={"http://localhost:8000/getfiles/uploads/" + link}
                alt=""
                key={link}
              />
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

export default PhotoUploader