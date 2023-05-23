import React, { useReducer } from 'react'
import * as GrIcons from "react-icons/gr";
import * as GiIcons from "react-icons/gi";
import styled from 'styled-components';

const initialValue = {
  'item_id': '',
  'item': '',
  'list_id': ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const Button = styled.button`
  border: none;
  background-color: white;
`;

const EditToDo = ({ item, setIsEditing, setTodos, tripId }) => {
  // console.log('from editing todo', item)

  const [state, dispatch] = useReducer(reducer, initialValue);

  const inputAction = (event) => {
    event.preventDefault();

    dispatch({
      type: "update",
      payload: { key: event.target.name, value: event.target.value },
    });
    initialValue.item = item;
    initialValue.item_id = item[0];
    initialValue.trip_id = tripId
    console.log(state);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state);
    
        try {
            fetch(`http://localhost:8080/edittodo/${state.item_id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(state),
            })
                .then((response) => response.json())
                .then(todos => {
                    setTodos(todos);
                    console.log('todo details fetched when current todo is updated', todos);
                    setIsEditing(false)
                })
            console.log(state)
            // window.location = "/"; 
        } catch (error) {
            console.error(error.message)
        }
        
  };

  const cancelEdit = () => {
    setIsEditing(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="update-todo"
        name="item"
        defaultValue={item[1]}
        onChange={inputAction}
      />
      
      <Button type="submit" id='save'><GrIcons.GrStatusGood style={{color: 'blue'}} /></Button>
      <Button type='button' id='cancel' onClick={cancelEdit}><GiIcons.GiCancel /></Button>
    </form>
  );
};

export default EditToDo