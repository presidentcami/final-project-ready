import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


export default function AllTrips({ user, trips, setTrips }) {

  if (!user) return null;
  const { user_id } = user[0]

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

    console.log("trips", trips)

  return (
    <div> 
        <div className='profile'>
              {trips.map((trip) => {
                return (
                <li key={trip.trip_id}>
                <Link to={`${trip.trip_id}`}>{trip.trip_name}</Link>
                {/* {trip.location}
                {trip.trip_description}
                {trip.trip_start_date} - {trip.trip_end_date} */}
                
                </li>)
                })
                }
                

        </div>
        


    </div>
  )
}
