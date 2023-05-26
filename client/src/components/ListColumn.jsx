import React from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd';
import Item from './ToDoItem';
import AddToDo from './AddToDo';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  background-color: #ececec;

  display: flex;
  flex-direction: column;
`;
export const Title = styled.h4`
    padding: 8px;

`;
export const ItemList = styled.div`
  padding: 8px;
  background-color: #ececec;
  flex-grow: 1;
  min-height: 200px;
  overflow-y: scroll;
`;

const ListColumn = ({ column, items, list_id, tripId, setTodos }) => {

  // console.log('testing props', column, items, list_id)
    
  return (
    <Container>
      <Title>{column}</Title>
      <AddToDo list_id={list_id} tripId={tripId} setTodos={setTodos} />
      <Droppable droppableId={column}>
        {(provided, snapshot) => (
          <ItemList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {items.map((item, index) => (
              
             item?.length > 0 && <Item
                key={item[0]}
                item={item}
                index={index}
                setTodos={setTodos}
                tripId={tripId}
              />
            ))}
            {provided.placeholder}
          </ItemList>
        )}
      </Droppable>
    </Container>
  );
}

export default ListColumn