import React, { useState } from "react";
import MyNavBar from "../routes/Navbar";
import NotLoggedInLandingPage from "./NotLoggedInLandingPage";
import SideBar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = ({ setUser, user, trips }) => {
  // console.log(trips)
  return (
    <div className="App">
      <MyNavBar setUser={setUser} user={user} />

      {!!user ? (
        <div style={{ flex: true }}>
          <SideBar trips={trips} user={user} />
          <Outlet />
        </div>
      ) : (
        <NotLoggedInLandingPage />
      )}
    </div>
  );
};

export default Layout;
