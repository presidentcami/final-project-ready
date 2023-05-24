import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Card } from 'semantic-ui-react'


export default function AllTrips({ user, trips }) {

  if (!user) return null;
  // console.log("trips", trips)
    const navigate = useNavigate();

  return trips && (
    <div> 
        <div className='profile'>
          <Card.Group itemsPerRow={2}>
                {trips.length > 0 ? trips.map((trip) => {
                return (
                  <Card 
                  key={trip.trip_id} 
                  onClick={() => {
                  navigate(`${trip.trip_id}`);
                  }}
                  fluid
                  >
                    <Card.Content>
                      <Card.Header>{trip.trip_name}</Card.Header>
                      <Card.Meta>
                        {trip.trip_start_date} - {trip.trip_end_date}
                      </Card.Meta>
                      <Card.Description>
                        {trip.trip_description}
                      </Card.Description>

                      <Link to={`${trip.trip_id}`}></Link>
                    </Card.Content>
                    <Card.Content extra>{trip.location}</Card.Content>
                  </Card>
                );
                }) : <h3>You don't have any trips yet! Get started <span><a href='/dashboard'>here</a></span>.</h3>
                }  

          </Card.Group>
          
            
         
      
                
                 

        </div>
        


    </div>
  )
}
