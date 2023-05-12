import React, { useState } from 'react'


export default function AllTrips({trips}) {
    const [show, setShow] = useState(false);
    console.log("trips", trips)

    const handleClose = () => setShow(current => !current);
    const handleShow = () => {
        // console.log(initialValue)
        setShow(!show)

    };
  return (
    <div> 
        {show ? <div>
              <button onClick={handleClose}>Hide Trips</button>{trips.map((trip) => {
                return (
                <li key={trip.trip_id}>
                {trip.trip_name}
                {trip.location}
                {trip.trip_description}
                {trip.trip_start_date} - {trip.trip_end_date}
                
                </li>)
                })
                }
                

        </div> :
        
        <button onClick={handleShow}>All Trips</button>}
        


    </div>
  )
}
