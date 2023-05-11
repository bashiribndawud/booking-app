import React from 'react'

const BookingGallery = ({ place, setShowAllPhoto }) => {
  return (
    <div className="relative">
      <div className="grid grid-cols-[2fr_1fr] grid-rows-2 gap-2">
        <div className=" row-span-2">
          {" "}
          {place.addedPhotos?.[0] && (
            <div>
              <img
                src={`http://localhost:8000/getFiles/uploads/${place.addedPhotos[0]}`}
                className="rounded-2xl object-cover w-full cursor-pointer"
                onClick={() => setShowAllPhoto(true)}
              />
            </div>
          )}
        </div>
        <div>
          {place.addedPhotos?.[1] && (
            <img
              src={`http://localhost:8000/getFiles/uploads/${place.addedPhotos[1]}`}
              className="w-full h-full object-cover rounded-2xl cursor-pointer"
              onClick={() => setShowAllPhoto(true)}
            />
          )}
        </div>
        <div>
          {place.addedPhotos?.[2] && (
            <img
              src={`http://localhost:8000/getFiles/uploads/${place.addedPhotos[2]}`}
              className="w-full h-full object-cover rounded-2xl cursor-pointer"
              onClick={() => setShowAllPhoto(true)}
            />
          )}
        </div>
      </div>
      {place.addedPhotos.length > 3 && (
        <button
          onClick={() => setShowAllPhoto(true)}
          className="absolute right-2 bottom-4 flex items-center justify-center gap-1 px-4 py-2 rounded-2xl bg-primary text-white shadow-lg hover:cursor-pointer hover:scale-[1.1]"
        >
          <span>show more</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default BookingGallery