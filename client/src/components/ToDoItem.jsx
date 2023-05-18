import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: white;
`;

const Item = ({ item, index }) => {
    console.log(item[item.length -1])
    // [item_id, item, item_due_date, item_version]
    // const { item_id, item, item_due_date, item_version } = item
  return (
    <Draggable draggableId={item[item.length - 1]} index={index}>
        {(provided) => (
        <Container 
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        
        >
            {item[1]}
        </Container>) }
   
    </Draggable>
  )
}

export default Item