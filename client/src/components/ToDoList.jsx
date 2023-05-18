import React, { useState, useEffect } from 'react'
import AddToDo from './AddToDo';
import EditToDo from './EditToDo';
import DeleteToDo from './DeleteToDo';
import ListColumn from './ListColumn';
import { DragDropContext } from 'react-beautiful-dnd'


// const updateItemDone = (itemDone, item_id) => {
//     try {
//         fetch(`http://localhost:8080/updateitemdone/${item_id}`, {
//             method: "PUT",
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({item_is_done: itemDone}),
//         })
//             .then((response) => response.json())
//             .then(trip => {
//                 setTrips(trip);
//                 console.log('trips fetched when new trip is added', trip);
//             })

//         // console.log(state)
//         // window.location = "/"; 
//     } catch (error) {
//         console.error(error.message)
//     }
// }

const ToDoList = ({ trip_id }) => {
    const [todos, setTodos] = useState(null)

    const loadTripTodos = () => {
        // A function to fetch the list of students that will be load anytime that list change
        fetch(`http://localhost:8080/triptodos/${trip_id}`)
            .then((response) => response.json())
            .then((deets) => {

                console.log("intial data from backend", deets)
                setTodos(deets);
            });
    }

    useEffect(() => {
        loadTripTodos();
    }, []);

    const onDragEnd = result => {

    }
// todos && console.log("todos after useeffect has loaded?", todos)
  return todos && (

   <DragDropContext onDragEnd={onDragEnd}> 

          {Object.entries(todos).map(([listName, items]) => {
            // console.log("in map", items)
        const listId= items.length > 0 ? items[0].list_id : null;
        const tripId= items.length > 0 ? items[0].trip_id : null;
        const column = listName;
              const items1 = items.map(item => {
                  const withNeWId = [item.item_id, item.item, item.item_due_date, item.item_version, `task-${item.item_id}`]
                  return withNeWId;
              })
              
        // console.log("in map", {listId}, {tripId})
    return (
        <ListColumn key={listId} list_id={listId} tripId={tripId} setTodos={setTodos} column={column} items={items1} />
        // <div key={listName}>
        //     <h4>{listName}</h4>
        //     <AddToDo list_id={listId} tripId={tripId} setTodos={setTodos} />
        //     <ul>
        //         {items.map (item => (
        //             <>
        //             <input type="checkbox" key={item.item_id} />
        //                 {item.item}
        //                 <EditToDo todos={todos} />

        //                 <DeleteToDo item_id={item.item_id} />
        //             <br /></> 
        //         ))}
        //     </ul>
        // </div>
    )
})}
      </DragDropContext>
  )
}

export default ToDoList