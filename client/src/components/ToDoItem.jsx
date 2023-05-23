import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import EditToDo from './EditToDo';

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${props => (props.isDragging ? '#c1beea' : 'white')};
`;


const Item = ({ item, index, setTodos, tripId }) => {
  const disableInteractiveElementBlocking = useRef(false);
  const [isEditing, setIsEditing] = useState(false);
console.log(item)
  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <Draggable draggableId={item[item.length - 1]} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
          disableInteractiveElementBlocking={disableInteractiveElementBlocking}
        >
          {isEditing ? (
            <EditToDo
              item={item}
              setIsEditing={setIsEditing}
              setTodos={setTodos}
              tripId={tripId}
            />
          ) : (
            <>
              {item[1]} {item[2] ? <>due: {item[2]}</> : null}  
              <span>
                <AiIcons.AiOutlineEdit onClick={handleEditClick}/>
              </span>{" "}
            </>
          )}
          {/* TODO build an edit button component that uses a little circular save/checkbox for a submit button, and has 
            the put request that will update this todo in the db */}
        </Container>
      )}
    </Draggable>
  );
};

export default Item