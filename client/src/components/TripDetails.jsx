import React from 'react'

const TripDetails = ({tripDetails}) => {
    const { location, trip_description, trip_end_date, trip_id, trip_name, trip_start_date } = tripDetails[0]

    console.log(location, trip_description, trip_end_date, trip_id, trip_name, trip_start_date)
  return (
    <div>
        <h1>{trip_name}</h1>
        <h3>{location}</h3>
        <h4>{trip_description}</h4>
        <p>{trip_start_date}-{trip_end_date}</p>

    </div>
  )
}

export default TripDetails