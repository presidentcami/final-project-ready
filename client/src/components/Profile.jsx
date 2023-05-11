import React, {useState} from "react";
import AddTrip from "./AddNewTrip";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = ({ user }) => {
    const [trips, setTrips] = useState([])
    // console.log("profile", user)
    const { isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
            <div>
                {/* <img src={user.picture} alt={user.name} /> */}
                <h2>{user[0].user_first_name} {user[0].user_last_name}</h2>
                <p>Welcome to your homepage, user at {user[0].user_email}</p>
                <AddTrip user={user} setTrips={setTrips} />
                {/* {trips.map(trip => trip.trip_name)} */}
            </div>
        
    );
};

export default Profile;