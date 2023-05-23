import React, { useState, useEffect } from 'react'
import AddToDo from './AddToDo';
import EditToDo from './EditToDo';
import DeleteToDo from './DeleteToDo';
import ListColumn from './ListColumn';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components';


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
const Container = styled.div`
    display: flex;

`;
const DoneBox = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  background-color: white;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h4`
  padding: 8px;
`;

const ItemList = styled.div`
  padding: 8px;
  background-color: ${(props) => (props.isDragging ? "black" : "white")};
  flex-grow: 1;
  min-height: 100px;
`;
const ToDoList = ({ trip_id, todos, setTodos }) => {


    const loadTripTodos = (tripid) => {
        // A function to fetch the list of students that will be load anytime that list change
        fetch(`http://localhost:8080/triptodos/${tripid}`)
            .then((response) => response.json())
            .then((deets) => {

                console.log("intial data from backend", deets)
                setTodos(deets);
            });
    }

    useEffect(() => {
        loadTripTodos(trip_id);
    }, [trip_id]);

    const onDragEnd = result => {
        console.log("result", result);
        const { destination, source, draggableId } = result;

        if (!destination) {
            return
        }

        if (destination.droppableId === source.droppableId) {
            if (destination.index === source.index) {
                return
            } else {
                let shallowList = [...todos[source.droppableId]];
                let [movingItem] = shallowList.splice(source.index, 1);
                shallowList.splice(destination.index, 0, movingItem);
                setTodos({...todos, [destination.droppableId]: shallowList})
                return;
            }
        } 

        const sourceList = [...todos[source.droppableId]];
        const destinationList = [...todos[destination.droppableId]];

        const movingItem = sourceList.splice(source.index, 1)
        
        console.log(movingItem)

        const newState = {
            ...todos, 
            [source.droppableId]: sourceList,
            [destination.droppableId]: destinationList.concat(movingItem)
        }

        setTodos(newState)

    }
// todos && console.log("todos after useeffect has loaded?", todos)
  return (
    todos && (
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {Object.entries(todos).map(([listName, items]) => {
            console.log("in map", items)
            const listId = items.length > 0 ? items[0].list_id : null;
            const tripId = items.length > 0 ? items[0].trip_id : null;
            const column = listName;
            const items1 = items.map((item) => {
                
              const withNeWId = item.item_id
                ? [
                    item.item_id,
                    item.item,
                    item.item_due_date,
                    item.item_version,
                    `task-${item.item_id}`,
                  ]
                : [
                    item.item_id,
                    item.item,
                    item.item_due_date,
                    item.item_version
                  ];
              return withNeWId;
            });
            return (
              <ListColumn
                key={listId}
                list_id={listId}
                tripId={tripId}
                setTodos={setTodos}
                column={column}
                items={items1}
              />

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
            );
          })}
          <DoneBox>
            <Title>Done</Title>
            <Droppable droppableId="Done">

              {(provided, snapshot) => (
                <ItemList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                > Drag done items here
                  {provided.placeholder}
                </ItemList>
              )}
            </Droppable>
          </DoneBox>
        </Container>
      </DragDropContext>
    )
  );
}

export default ToDoList