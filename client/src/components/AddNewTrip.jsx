

import React, { useState, useReducer } from 'react'
import { Button } from "react-bootstrap"
import * as ioicons from 'react-icons/io5'

const initialValue = {
    trip_name: '',
    trip_start_date: '',
    trip_end_date: '',
    location: '',
    readyusers_user_id: '',
    trip_description: '',
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return {
                ...state,
                [action.payload.key]: action.payload.value,
            };
        case 'reset': 
            return { ...initialValue } 
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};

const AddTrip = ({ setTrips, user }) => {

    const [state, dispatch] = useReducer(reducer, initialValue);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(current => !current);
    const handleShow = () => {
        // console.log(initialValue)
        setShow(!show)

    };

    const inputAction = (event) => {
        event.preventDefault();

        dispatch({
            type: 'add',
            payload: { key: event.target.name, value: event.target.value },
        });
        state.readyusers_user_id = user[0].user_id;
        console.log(state)
    };

    // console.log(user)

    //A function to handle the post request
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            fetch('http://localhost:8080/addtrip', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(state),
            })
                .then((response) => response.json())
                .then(trip => {
                    setTrips(trip);
                    console.log('trips fetched when new trip is added', trip);
                    handleClose()
                })
                dispatch ({ type: 'reset', initialValue })
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
            {show ? <>
                <form onSubmit={handleSubmit} id="addNewTripForm">
                    <h3>Add New Trip</h3>
                    <div><label>Trip Name</label></div>
                    <input
                        type="text"
                        id="add-new-trip-name"
                        name="trip_name"
                        value={state.trip_name}
                        onChange={inputAction}
                    />
                    <div><label>Location</label></div>
                    <input
                        type="text"
                        id="add-location"
                        name="location"
                        value={state.location}
                        onChange={inputAction}
                    />
                    <div><label>Trip Description</label></div>
                    <textarea
                        rows="13"
                        cols="96"
                        type="text-area"
                        id="add-trip-description"
                        name="trip_description"
                        value={state.trip_description}
                        onChange={inputAction}
                    />
                    <div><label>Start Date</label></div>
                    <div>
                        <input
                            type="date"
                            id="add-start-date"
                            name="trip_start_date"
                            required
                            onChange={inputAction}
                        />
                    </div>
                    <div><label>End Date</label></div>
                    <div>
                        <input
                            type="date"
                            id="add-end-date"
                            name="trip_end_date"
                            required
                            onChange={inputAction}
                        />
                    </div>
                    <section>
                        <Button type="submit" variant="outline" className='functionalButton' style={{ padding: '0.6em', marginTop: '0.9em' }}>Submit</Button>
                        <Button type="button" variant="outline" className='functionalButton' onClick={handleClose} style={{ padding: '0.6em', marginTop: '0.9em' }}>Cancel</Button>
                    </section>
                </form>
            </> : <Button id="add-blog" className='functionalButton' variant="outline" aria-label="Add Trip" onClick={handleShow} style={{ padding: '0.6em', marginRight: '0.9em', marginTop: '0.3em' }}> Add a New Trip </Button>
}


        </>
    );
};


export default AddTrip
