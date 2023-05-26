import React from "react";

const Profile = ({ user }) => {

    if (!user) return null;
    const { user_first_name, user_last_name, user_email } = user[0]


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