import React, { useState, useEffect } from "react";
import styled from "styled-components";
import background from '../assets/blue-window.jpg'
import AddTrip from "./AddNewTrip";
import { useAuth0 } from "@auth0/auth0-react";

    const Background = styled.div`
      background-image: url(${background});
      min-height: 100vh;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    `;

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
                <div className="profile" style={{ textAlign: 'center', padding: '100px'}}> 
                <h2>{user_first_name} {user_last_name}</h2>
                <h3>Welcome to your homepage, user at {user_email}</h3>
                <h3>Go to your Dashboard to add a new trip!</h3>
                </div> 
            </div> 
    );
};

export default Profile;