import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

const OneTrip = () => {
  const { trip_id } = useParams();
  const [tripDetails, setTripDetails] = useState(null)
  console.log(trip_id)

  const loadTripDetails = () => {
    // A function to fetch the list of students that will be load anytime that list change
    fetch(`http://localhost:8080/tripdetails/${trip_id}`)
      .then((response) => response.json())
      .then((deets) => {
        // console.log(deets)
        setTripDetails(deets);
      });
  }

  useEffect(() => {
    loadTripDetails();
  }, []);

  return (
    <div className='profile'>

      <h1>one trip dhabd;jbhalknfb;fnbalkrnkbajnfblknb;knsbka</h1>
    </div>
  )
}

export default OneTrip