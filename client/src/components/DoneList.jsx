import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components';
import {Title, ItemList} from './ToDoList'

const DoneBox = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  background-color: white;

  display: flex;
  flex-direction: column;
`;



const DoneList = ({ doneItems, setDoneItems, trip_id }) => {
 
    
const getDoneItems = (trip_id) => {
       
   try {
     console.log(trip_id);
     fetch(`http://localhost:8080/donetodos/${trip_id}`)
       .then((response) => response.json())
       .then((doneTodos) => {

         console.log("done todo details fetched", doneTodos);
         setDoneItems(doneTodos);
       });
     //  console.log(state);
   } catch (error) {
     console.error(error.message);
   }
 };


  useEffect(() => {
    getDoneItems(trip_id);
  }, []);

  return doneItems && (
    <DoneBox>
      <Title>Done</Title>
      <Droppable droppableId="Done">
        {(provided, snapshot) => (
          <ItemList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {" "}
            {/* Drag done items here */}
            {doneItems.length > 0 ? (
              doneItems.map((item) => (
                // console.log("in map", item);
                item.item
              ))
            ) : (
              <p>Drag done items here</p>
            )}
            {provided.placeholder}
          </ItemList>
        )}
      </Droppable>
    </DoneBox>
  );
};

export default DoneList