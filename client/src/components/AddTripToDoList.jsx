import React, {useState, useReducer} from 'react'
import styled from 'styled-components';


const initialValue = {
  list_name: "",
  trip_id: "",
  user_id: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case "reset":
      return { ...initialValue };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const Button = styled.button`
  border-radius: 10px;
  border: none;
  background-color: #fddc95;
  margin: 5px;
  width: 100px;
  font-family: "Lato", sans-serif;
  font-weight: lighter;
`;

const AddToDoList = ({ setTodos, tripDetails }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const [show, setShow] = useState(false);
  const {trip_id, user_id} = tripDetails[0];

  const handleClose = () => setShow((current) => !current);
  const handleShow = () => {
    // console.log(initialValue)
    setShow(!show);
  };

    // console.log('from adding a todo list', tripDetails)

  const inputAction = (event) => {
    event.preventDefault();

    dispatch({
      type: "add",
      payload: { key: event.target.name, value: event.target.value },
    });
    state.user_id = user_id;
    state.trip_id = trip_id;
    console.log(state);
  };

  // console.log(user)

  //A function to handle the post request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      fetch("http://localhost:8080/addtriplist", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      })
        .then((response) => response.json())
        .then((trip) => {
          setTodos(trip);
          console.log("trips fetched when new trip is added", trip);
          handleClose();
        });
      dispatch({ type: "reset", initialValue });
      // console.log(state)
      // window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  // let someDate = new Date();
  // someDate.setDate(someDate.getDate() + 3);
  // let date = someDate.toISOString().substring(0, 10);

  return (
    <>
      {show ? (
        <>
          <form onSubmit={handleSubmit}>
            <h4>Add New List</h4>
            <div>
              <label>List Name</label>
            </div>
            <input
              type="text"
              id="add-new-list-name"
              name="list_name"
              value={state.list_name}
              onChange={inputAction}
            />
            <section>
              <Button type="submit">Submit</Button>
              <Button type="button" onClick={handleClose}>
                Cancel
              </Button>
            </section>
          </form>
        </>
      ) : (
        <Button onClick={handleShow}> New List </Button>
      )}
    </>
  );
};

export default AddToDoList