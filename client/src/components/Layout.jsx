import React, { useEffect, useState } from "react";
import MyNavBar from "../routes/Navbar";
import NotLoggedInLandingPage from "./NotLoggedInLandingPage";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "./PageLoader";

const Layout = ({ setUser, user, trips }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false)

    const {
      isLoading,
      user: auth0user
    } = useAuth0();

    // console.log(auth0user);
    useEffect(()=> {
      if (isLoading) {
        setIsLoggingIn(true)
        // console.log('test1')
      }

      if (!isLoading && !auth0user) {
        setIsLoggingIn(false)
        // console.log("test2");
      }

      if (user) {
        setIsLoggingIn(false)
        // console.log("test3");
      }
    }, [isLoading, user, auth0user])
  // console.log(trips)
  return (
    <div className="App">
      <MyNavBar setUser={setUser} user={user} />

      {isLoggingIn ? <PageLoader /> : !!user ? (
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
