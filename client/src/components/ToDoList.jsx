import React, { useState } from 'react'

const ToDoList = ({ tripDetails }) => {
    const {item, item_due_date, item_id, item_is_done, list_id, list_name} = tripDetails
    const [itemDone, setItemDone] = useState(item_is_done)

    const checkboxHandler = () => {
        setItemDone(!itemDone)

        
    }

  return (
    <div>
        {tripDetails.map((tripDetail) => {
        
        return (
            <div>
            <p>{tripDetail.list_name}</p>
            <div key={tripDetail.item_id}>
            <input type="checkbox" onChange={checkboxHandler} />
                    {tripDetail.item}
                
            </div>
            </div>
        )}
        )}

    </div>
  )
}

export default ToDoList