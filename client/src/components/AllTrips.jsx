import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

  const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
  `;

export default function AllTrips({ user, trips }) {

  if (!user) return null;
  // console.log("trips", trips)

  return (
    <div> 
        <div className='profile'>
      
              {trips.length > 0 ? trips.map((trip) => {
                return (
                <li key={trip.trip_id}>
                <Link to={`${trip.trip_id}`}>{trip.trip_name}</Link>
                {/* {trip.location}
                {trip.trip_description}
                {trip.trip_start_date} - {trip.trip_end_date} */}
                
                </li>)
                }) : <h3>You don't have any trips yet! Get started <span><a href='/dashboard'>here</a></span>.</h3>
                }    
                

        </div>
        


    </div>
  )
}
