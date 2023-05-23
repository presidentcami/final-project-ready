import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${props => (props.isDragging ? '#c1beea' : 'white')};
`;

const Item = ({ item, index }) => {
    // console.log(item[item.length -1])
    // [item_id, item, item_due_date, item_version]
    // const { item_id, item, item_due_date, item_version } = item
  return (
    <Draggable draggableId={item[item.length - 1]} index={index}>
        {(provided, snapshot) => (
        <Container 
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
        >
            {item[1]}
        </Container>) }
   
    </Draggable>
  )
}

export default Item