import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = ({user}) => {
    // console.log("profile", user)
    const { isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
            <div>
                {/* <img src={user.picture} alt={user.name} /> */}
                <h2>{user[0].user_first_name} {user[0].user_last_name}</h2>
                <p>{user[0].user_email}</p>
            </div>
        
    );
};

export default Profile;