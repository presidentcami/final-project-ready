import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Card } from 'semantic-ui-react'


export default function AllTrips({ user, trips, setTrips }) {

  if (!user) return null;

  const { user_id } = user[0];
  // console.log("trips", trips)
    const navigate = useNavigate();
 const loadTrips = (userid) => {
  console.log(userid, 'in alltrips component')
    // A function to fetch the list of students that will be load anytime that list change
    fetch(`/usertrips/${userid}`)
      .then((response) => response.json())
      .then((trips) => {
        // console.log(trips)
        setTrips(trips);
      });
  }

  useEffect(() => {
    loadTrips(user_id);
  }, [user_id]);

    // console.log("trips", trips)
  return trips && (
        <div className='profile'>
          <Card.Group itemsPerRow={2} style={{margin: '1em'}}>
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
                      <Card.Header style={{fontFamily: 'Lato, sans-serif', fontWeight: 'lighter'}}>{trip.trip_name}</Card.Header>
                      <Card.Meta>
                        {trip.trip_start_date} - {trip.trip_end_date}
                      </Card.Meta>
                      <Card.Description>
                        {trip.trip_description}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>{trip.location}</Card.Content>
                  </Card>
                );
                }) : <h3>You don't have any trips yet! Get started <span><a href='/dashboard'>here</a></span>.</h3>
                }  

          </Card.Group>
        </div>
       )
}
