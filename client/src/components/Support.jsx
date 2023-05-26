import React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  background-color: #e5ccc0;
  margin: 20%;
  padding: 15px;
  height: 100%;
  font-family: Lato, sans-serif;
  display: flex;
  width: max-content;
`;

const Support = () => {
  return (
    <div>
        <Section>
            <h2>Upcoming Features</h2>
            <ul>
                <li>
                    Suggestions of things to do in the trip - not just what to pack!
                </li>
                <li>
                    Google maps for recommendations of places to go
                </li>
                <li>
                    Calendar integration
                </li>
                <li>
                    Contact us form
                </li>
                <li>
                    Color coding lists and dark mode for the whole site
                </li>
            </ul>
        </Section>
        
    </div>
  )
}

export default Support