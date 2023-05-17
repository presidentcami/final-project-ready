import React, { useState } from 'react'
import AddToDo from './AddToDo';
import EditToDo from './EditToDo';
import DeleteToDo from './DeleteToDo';

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

const ToDoList = ({ tripDetails: toDoItems }) => {

    const {item, item_due_date, item_id, item_is_done, list_id, list_name, item_version} = toDoItems;
    const [itemDone, setItemDone] = useState(

    )

    const checkboxHandler = async (item_id, is_done) => {
        setItemDone(!is_done)
        const responseObj = updateItemDone(itemDone, item_id)
        // console.log(itemDone)

    }

  return (
    <div>
        {toDoItems.map((tripDetail) => {
        
        return (
            <div key={tripDetail.list_id}>
            <p>{tripDetail.list_name}</p>
            <AddToDo />
            <div key={tripDetail.item_id}>
                    <input type="checkbox" onChange={() => checkboxHandler(tripDetail.item_id, tripDetail.item_is_done)} />
                    {tripDetail.item} 
                    <EditToDo />
                    
                    <DeleteToDo />
            </div>
            </div>
        )}
        )}

    </div>
  )
}

export default ToDoList