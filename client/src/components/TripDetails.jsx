import React, { useState } from 'react'
import styled from 'styled-components';
import EditTripDetails from './EditTripDetails';

const Button = styled.button`
    border-radius: 10px;
    border: none;
    background-color: #fddc95;
    margin: 5px;
  `;

const TripDetails = ({ tripDetails, setTripDetails }) => {
  const [show, setShow] = useState(true);
  const {
    location,
    trip_description,
    trip_end_date,
    trip_id,
    trip_name,
    trip_start_date,
  } = tripDetails[0];


const handleShow = () => {
  setShow(!show)
}
  // console.log(location, trip_description, trip_end_date, trip_id, trip_name, trip_start_date)
  // console.log(show)
  return (
    <>
      {show ? (
        <div>
          <h1>{trip_name}</h1>
          <h3>{location}</h3>
          <h4>{trip_description}</h4>
          <p>
            {trip_start_date}-{trip_end_date} <Button onClick={handleShow}> Edit Trip </Button>
          </p>
          
        </div>
      ) : (
        <EditTripDetails
          tripDetails={tripDetails}
          setTripDetails={setTripDetails}
          show={show}
          setShow={setShow}
        />
      )}
    </>
  );
};

export default TripDetails