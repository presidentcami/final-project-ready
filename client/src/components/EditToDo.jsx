import React, { useReducer } from 'react'

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

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="update-todo"
        name="item"
        defaultValue={item[1]}
        onChange={inputAction}
      />
      <button type="submit">save</button>
    </form>
  );
};

export default EditToDo