import React, { useReducer } from 'react'
import * as ioicons from 'react-icons/io5'
import styled from 'styled-components'

const initialValue = {
    location: '',
    trip_description: '',
    trip_end_date: '',
    trip_name: '',
    trip_start_date: '',
}


const reducer = (state, action) => {
    switch (action.type) {
        case 'update':
            return {
                ...state,
                [action.payload.key]: action.payload.value,
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};

  const Button = styled.button`
    border-radius: 10px;
    border: none;
    background-color: #fddc95;
    margin: 5px;
    font-family: "Lato", sans-serif;
    font-weight: lighter;
  `;

const EditTripDetails = ({ tripDetails, setTripDetails, show, setShow }) => {

    const {  location, trip_description, trip_end_date, trip_id, trip_name, trip_start_date } = tripDetails[0];

    const [state, dispatch] = useReducer(reducer, initialValue);

    // console.log(show)

    const handleClose = () => setShow(true);

    const inputAction = (event) => {
        event.preventDefault();

        dispatch({
            type: 'update',
            payload: { key: event.target.name, value: event.target.value },
        });
        initialValue.location = location;
        initialValue.trip_description = trip_description;
        initialValue.trip_end_date = trip_end_date;
        initialValue.trip_name = trip_name;
        initialValue.trip_start_date = trip_start_date;
        // console.log(state)
    };

    //A function to handle the post request
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            fetch(`/edittrip/${trip_id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(state),
            })
                .then((response) => response.json())
                .then(trip => {
                    setTripDetails(trip);
                    // console.log('Trip details fetched when current trip is updated', trip);
                    handleClose()
                })
            // console.log(state)
            // window.location = "/"; 
        } catch (error) {
            console.error(error.message)
        }
    }

    // let someDate = new Date();
    // someDate.setDate(someDate.getDate() + 3);
    // let date = someDate.toISOString().substring(0, 10);

    return (
        <>
            {!show && <>
                <form onSubmit={handleSubmit}>
                    <h3>Edit Trip</h3>
                    <div><label>Trip Name</label></div>
                    <input
                        type="text"
                        id="update-trip_name"
                        name="trip_name"
                        defaultValue={trip_name}
                        onChange={inputAction}
                        // style={{lineHeight: '50px'}}
                    />
                    <div><label>Location</label></div>
                    <input
                        type="text"
                        id="update-location"
                        name="location"
                        defaultValue={location}
                        onChange={inputAction}
                    />
                    <div><label>Trip Description</label></div>
                    <textarea
                        rows="5"
                        cols="96"
                        type="text-area"
                        id="update-trip_description"
                        name="trip_description"
                        defaultValue={trip_description}
                        onChange={inputAction}
                    />
                    <div><label>Start Date</label></div>
                    <div>
                    <input
                        type="date"
                        id="update-start-date"
                        name="trip_start_date"
                        value={trip_start_date}
                        onChange={inputAction}
                    />
                    </div>
                    <div><label>End Date</label></div>
                    <div>
                    <input
                        type="date"
                        id="update-end-date"
                        name="trip_end_date"
                        value={trip_end_date}
                        onChange={inputAction}
                    />
                    </div>
                    <section>
                        <Button type="submit">Submit Changes</Button>
                        <Button type="button" onClick={handleClose}>Cancel</Button>
                    </section>
                </form>
            </>}


        </>
    );
};


export default EditTripDetails
