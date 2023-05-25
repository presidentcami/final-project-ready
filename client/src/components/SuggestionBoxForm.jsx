import React, { useState } from 'react'
import styled from 'styled-components';
import Suggestions from './Suggestions';

  const Button = styled.button`
    border-radius: 10px;
    border: none;
    background-color: #fddc95;
    margin: 5px;
    margin-right: 3rem;
    font-family: "Lato", sans-serif;
    font-weight: lighter;
  `;

  const PillButton = styled.button`
    background-color: #c1beea;
    border: none;
    color: black;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 16px;
    font-family: "Lato", sans-serif;
    font-weight: lighter;
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
        // console.log(activities)
        const userPrompt = `I am going to ${location}. Here is a description of my trip: ${description}. I think we'll do these activities: ${activities}. Act as a trip planner for me. What should I pack for this trip? Write your response in the form of an array that looks like {'list': ['sandals', 'beach towel', 'sunglasses']}`
        let mockDataArray = "? -Swimsuits -Beach towels -Kayaking gear -Sunscreen -Sunglasses -Hat -Sarong -Flip Flops -Snorkeling gear -Beach toys -Karaoke machine -Beach chairs -Cooler -Picnic blanket -Snacks -Drinks -Binoculars -Camera -Bug spray -First aid kit".split(/[-?]/)
        let noEmptiesArray = mockDataArray.filter((item) => item.trim() != '');
        setSuggestions(noEmptiesArray);
        // console.log(userPrompt)
        // try {
        //  fetch(`http://localhost:8080/api/openai/${userPrompt}`)
        //  .then((response) => response.json())
        //  .then((data) => {
        //     console.log('line 38 in suggestion box frontend - response', data)
        //     setSuggestions(data)
            
        //   })
        // } catch (error) {
        //     console.error(error)
        // }
        clearForm()
    }
    // console.log(suggestions);

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
        {!suggestions ? null : <div>{suggestions.map((item, index) => {
          console.log(item)
          return( 
        <PillButton key={index}>{item}</PillButton>)})}</div> }

    </div>
  )
}

export default SuggestionBoxForm