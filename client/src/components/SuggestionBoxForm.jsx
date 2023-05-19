import React, { useState } from 'react'
import styled from 'styled-components';

  const Button = styled.button`
    border-radius: 10px;
    border: none;
    background-color: #fddc95;
    margin: 5px;
    margin-right: 3rem;
  `;

const SuggestionBoxForm = ({ tripDetails }) => {

    const location = tripDetails[0].location
    const description = tripDetails[0].trip_description
    // console.log(tripDetails)
    const [activities, setActivities] = useState(null)

    const [suggestions, setSuggestions] = useState(null)


    const clearForm = () => {
        setActivities(null)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
         fetch('http://localhost:8080/openai', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
             body: JSON.stringify({location: location, description: description, activities: activities})
         })
         .then((response) => response.json())
         .then((data) => {
            console.log(data)
            setSuggestions(data)})
        } catch (error) {
            console.error(error)
        }
        clearForm()
    }
    // console.log(activities)

  return (
    <div>
        <form onSubmit={handleSubmit}>
              <input
                  type='text'
                  id='add-activities'
                  placeholder="Input any activities you'll do on your trip!"
                  required
                //   value={activities}
                  onChange={(e) => setActivities(e.target.value)}
              />
              <Button type="submit">Submit</Button>
        </form>

    </div>
  )
}

export default SuggestionBoxForm