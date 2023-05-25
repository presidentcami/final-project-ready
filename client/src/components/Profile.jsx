import React, { useState, useEffect } from "react";
import AddTrip from "./AddNewTrip";
import { useAuth0 } from "@auth0/auth0-react";


const Profile = ({ user, setTrips }) => {

    if (!user) return null;
    const { user_first_name, user_last_name, user_email } = user[0]
    
    // console.log("profile", user)
    // const { isLoading } = useAuth0();
    

    // if (isLoading) {
    //     return <div>Loading ...</div>;
    // }

    return user && ( 
            <div className="dashboard">
                <div className="profile">
                <h2>{user_first_name} {user_last_name}</h2>
                <p>Welcome to your homepage, user at {user_email}</p>
                <AddTrip user={user} setTrips={setTrips} />
                </div>
            </div>
        
    );
};

export default Profile;