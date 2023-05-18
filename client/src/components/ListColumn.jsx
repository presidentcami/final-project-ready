import React from 'react'
import styled from 'styled-components'
import Item from './ToDoItem';

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

const ListColumn = ({ column, items }) => {

  console.log('testing props', column, items)
    
  return (
    <Container>
       <Title>{column}</Title>
       <ItemList>{items.map(item => <Item key={item[0]} item={item[1]} />)}</ItemList>
    </Container>
  )
}

export default ListColumn