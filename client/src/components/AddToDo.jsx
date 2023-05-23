import React, { useState, useReducer } from 'react'
import * as ioicons from 'react-icons/io5'
import styled from 'styled-components'

const initialValue = {
    item: '',
    item_due_date: '',
    list_id: '',
    trip_id: '',
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

  const Button = styled.button`
    border-radius: 10px;
    border: none;
    background-color: #fddc95;
    margin: 4%;
    width: 30%;
  `;

const AddToDo = ({ list_id, tripId, setTodos }) => {


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
        state.list_id = list_id;
        state.trip_id = tripId;
        console.log(state)
    };

    // console.log(user)

    //A function to handle the post request

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            fetch('http://localhost:8080/addtodo', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(state),
            })
                .then((response) => response.json())
                .then(todoDeets => {
                    setTodos(todoDeets);
                    console.log('todo details fetched when new todo is added', todoDeets);
                    handleClose()
                })
            dispatch({ type: 'reset', initialValue })
            // console.log(state)
            // window.location = "/"; 
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <>
            {show ? <>
                <form onSubmit={handleSubmit}>
                    <p>Add List Item</p>
                    <div><label>Item</label></div>
                    <input
                        type="text"
                        id="add-new-item"
                        name="item"
                        value={state.item}
                        required
                        onChange={inputAction}
                    />
                    <div><label>Due Date (optional)</label></div>
                    <div>
                        <input
                            type="date"
                            id="add-due-date"
                            name="item_due_date"
                            onChange={inputAction}
                        />
                    </div>
                    <section>
                        <Button type="submit">Submit</Button>
                        <Button type="button" onClick={handleClose}>Cancel</Button>
                    </section>
                </form>
            </> : <Button onClick={handleShow}> Add List Item </Button>
            }


        </>
    );
}

export default AddToDo