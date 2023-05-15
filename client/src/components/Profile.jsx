import React, { useState, useEffect } from "react";
import AddTrip from "./AddNewTrip";
import AllTrips from "./AllTrips";
import { useAuth0 } from "@auth0/auth0-react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const Profile = ({ user, trips, setTrips }) => {

    if (!user) return null;
    const { user_id, user_first_name, user_last_name, user_email } = user[0]
    
    // console.log("profile", user)
    const { isLoading } = useAuth0();

    const loadTrips = () => {
        // A function to fetch the list of students that will be load anytime that list change
        fetch(`http://localhost:8080/trips/${user_id}`)
            .then((response) => response.json())
            .then((trips) => {
                // console.log(trips)
                setTrips(trips);
            });
    }

    useEffect(() => {
        loadTrips();
    }, []);
    

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return user && ( 
            <div className="dashboard">
                <div className="profile">
                <h2>{user_first_name} {user_last_name}</h2>
                <p>Welcome to your homepage, user at {user_email}</p>
                {/* <AllTrips trips={trips} /> */}
                <AddTrip user={user} setTrips={setTrips} />
                </div>
            </div>
        
    );
};

export default Profile;