import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="flex flex-col">
        <Header />
        <div className="mx-8 my-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
