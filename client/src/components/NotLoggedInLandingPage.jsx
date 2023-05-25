import React from 'react';
import background from '../assets/beach-ball-background.jpg'
import styled from 'styled-components';

const NotLoggedInLandingPage = () => {

    const Background = styled.div`
      background-image: url(${background});
      min-height: 100vh;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    `;

    const Blurb = styled.div`
      margin: 20%;
      background-color: rgb(217, 184, 169, 0.5);
      padding: 100px;
      border-radius: 10px;
      min-height: 400px;
    `;

    const Text = styled.h3`
        line-height: 34px;
        font-weight: lighter;
    `;

    return (
      <Background data-testid="landing">
        <Blurb> <Text>
          Ready is a vacation management app that can make you ready to go on
          your trip AND come back to reality. Create to-do lists for
          before, during, and after your trips. Lists can be associated with a
          specific trip, which will include a location, date, and a description
          to help AI recommend an itinerary and things to pack.
          They can also add in ad-hoc lists or details
          that are specific to that vacation. Log in to get Ready!</Text>
        </Blurb>
      </Background>
    );

}

export default NotLoggedInLandingPage;