import React, { useState, useEffect } from 'react'
import AddToDo from './AddToDo';
import EditToDo from './EditToDo';
import DeleteToDo from './DeleteToDo';
import ListColumn from './ListColumn';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components';
import DoneList from './DoneList';


const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const ToDoList = ({ trip_id, todos, setTodos }) => {

    const [doneItems, setDoneItems] = useState(null);

    const loadTripTodos = (tripid) => {
        // A function to fetch the list of students that will be load anytime that list change
        fetch(`/triptodos/${tripid}`)
            .then((response) => response.json())
            .then((deets) => {

            // console.log("intial data from backend", deets)
                setTodos(deets);
            });
    }

    const setItemDone = (item_id) => {
     const doneData = {
        "item_is_done": true,
        "trip_id":`${trip_id}`
      }
      // console.log('testing trycatch')
      try {
        fetch(`/markdone/${item_id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(doneData),
        })
          .then((response) => {
            // console.log("response being logged", response)
              return response.json()
            }
              )
          .then((items) => {
            // console.log("items details fetched when current items is updated", items)
              setDoneItems(items);
              // console.log('successss')
          })
          .then(() => {
            // console.log('testing testing') 
            loadTripTodos(trip_id)
          })
        // console.log(state)
        // window.location = "/";
      } catch (error) {
        // console.log('error happening here');
        console.error(error.message);
      }
    }

    useEffect(() => {
        loadTripTodos(trip_id);
    }, [trip_id]);

    const onDragEnd = result => {
        // console.log("result", result);
        const { destination, source, draggableId } = result;

        if (!destination) {
            return
        }

        if (destination.droppableId === 'Done') {
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
        // const destinationList = 
        // console.log('todos', todos)
        // console.log('todos at droppableid', todos[destination.droppableId]);
        // console.log("droppable id", destination.droppableId);
        // const destinationList = [...todos[destination.droppableId]];
        // const  destinationList = doneItems;

        const movingItem = sourceList.splice(source.index, 1)
        
        // console.log(movingItem[0].item_id)
        // console.log(doneItems)

        const newState = doneItems.concat(...movingItem)

        setDoneItems(newState)
        console.log(doneItems)
        setItemDone(movingItem[0].item_id);
    } else {
        return
    }

    }
// todos && console.log("todos after useeffect has loaded?", todos)
  return (
    todos && (
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {Object.entries(todos).map(([listName, items]) => {
            // console.log("in map", items)
            const listId = items.length > 0 ? items[0].list_id : null;
            const tripId = items.length > 0 ? items[0].trip_id : null;
            const column = listName;
            const items1 = items.map((item) => {
                if (!item.item_is_done) {
                  if (item.item_id) {
                    return [
                      item.item_id,
                      item.item,
                      item.item_due_date,
                      item.item_version,
                      `task-${item.item_id}`,
                    ];
                  }
                } else {
                  return;
                }
                  // console.log('with new id', withNeWId)
              
            });
            //  console.log(items1, "in map");
            return  (
              <ListColumn
                key={listId}
                list_id={listId}
                tripId={tripId}
                setTodos={setTodos}
                column={column}
                items={items1}
              />
            );
          })}
         <DoneList  doneItems={doneItems} trip_id={trip_id} setDoneItems={setDoneItems} />
        </Container>
      </DragDropContext>
    )
  );
}

export default ToDoList
