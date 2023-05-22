import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import ToDoList from './ToDoList';
import TripDetails from './TripDetails';
import SuggestionBoxForm from './SuggestionBoxForm';
import AddToDoList from './AddTripToDoList';

const OneTrip = () => {
  const { trip_id } = useParams();
  const [tripDetails, setTripDetails] = useState(null)
  const [todos, setTodos] = useState(null);
  // console.log(trip_id)
  

  const loadTripDetails = (trip_id) => {
    // A function to fetch the list of students that will be load anytime that list change
    fetch(`http://localhost:8080/tripdetails/${trip_id}`)
      .then((response) => response.json())
      .then((deets) => {
        console.log(deets);
        setTripDetails(deets);
      });
  };

  useEffect(() => {
    loadTripDetails(trip_id);
  }, [trip_id]);

  /* 
Trip Details from get request to send as props or map onto screen 
{item, item_due_date, item_id, item_is_done, list_id, list_name, location, trip_description, trip_end_date, trip_id, trip_name, trip_start_date, user_id}   */
  return (
    tripDetails && (
      <>
      <div className="profile">
        <TripDetails
          tripDetails={tripDetails}
          setTripDetails={setTripDetails}
        />
        <SuggestionBoxForm tripDetails={tripDetails} />
        <AddToDoList setTodos={setTodos} tripDetails={tripDetails} />
      </div>
      <div className='profile1'>
        <ToDoList trip_id={trip_id} todos={todos} setTodos={setTodos} />
      </div>
      </>
    )
  );
}

export default OneTrip