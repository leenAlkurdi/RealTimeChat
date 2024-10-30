import React from "react";
import { Outlet } from "react-router-dom";
import { UserProvider } from "../userContext";

const Root = () => {
  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  );
};

export default Root;
