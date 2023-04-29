import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/userContext";
const Header = () => {
  const {
    state: { user },
  } = useUserContext();
  return (
    <header className="py-3 px-9 flex justify-between items-center border-b border-gray-300">
      <Link to={"/indexPage"} className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 -rotate-90"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
        <span className="font-bold text-xl">Airbnc</span>
      </Link>

      <div className="flex justify-between items-center rounded-full border border-gray-300 py-2 px-4 shadow-md shadow-gray-300">
        <div className="border-r px-2 border-gray-300 font-semibold">
          Anywhere
        </div>
        <div className="border-r border-gray-300 px-2 font-semibold">
          Any week
        </div>
        <div className="px-2">Add guest</div>
        <button className="rounded-full bg-primary p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center border border-gray-300 rounded-full gap-2 px-4 py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
        <Link to={"/login"} className="bg-gray-400 p-1 rounded-full text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
        </Link>

        {!!user && (<div>{user?.name}</div>)}
      </div>
    </header>
  );
};

export default Header;
