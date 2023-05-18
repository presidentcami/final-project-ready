import React from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd';
import Item from './ToDoItem';
import AddToDo from './AddToDo';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
`;
const Title = styled.h4`
    padding: 8px;

`;
const ItemList = styled.div`
    padding: 8px;
`;

const ListColumn = ({ column, items, list_id, tripId, setTodos }) => {

  console.log('testing props', column, items, list_id)
    
  return (
    <Container>
       <Title>{column}</Title>
       <AddToDo list_id={list_id} tripId={tripId} setTodos={setTodos} />
       <Droppable droppableId={column}>
       {(provided) => (
        <ItemList 
            ref={provided.innerRef}
            {...provided.droppableProps} >
                  {items.map((item, index) => <Item key={item[0]} item={[...item]} index={index} /> 
        )}
        {provided.placeholder}
        </ItemList>)}
       </Droppable>
    </Container>
  )
}

export default ListColumn