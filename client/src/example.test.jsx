
import MyNavBar from './routes/Navbar.jsx';
import {expect, test } from 'vitest';
import {getByRole, render, screen} from '@testing-library/react';
import NotLoggedInLandingPage from './components/NotLoggedInLandingPage';

//Navbar rendering
const user = [{
  user_auth0_nickname: "camiwills325",
  user_created: "2023-05-09T21:55:22.122Z",
  user_email: "camiwills325@gmail.com",
  user_first_name: "Camille",
  user_id: 1,
  user_last_name: "Williams",
  user_username: null
}]

// describe('Navbar', () => {
//   it('renders nav bar', () => {
//     render(<MyNavBar user={user} />);
//     expect(
//       screen.getByTestId('navbar')

//     ).toBeDefined();
//   })
// })
// describe('Login Button', () => {
//   it('renders login button', () => {
//     render(<MyNavBar user={user} />);
//     expect(
//       screen.getByTestId('navbar')

//     ).toBeDefined();
//   })
// })


test('Navbar renders correctly', () => {
  render(<MyNavBar user={user} />);
  const navbarElement = screen.getByTestId('navbar');
  // console.log("navbar element in test jsx", navbarElement)
  expect(navbarElement).toBeDefined();
});

test('Without user landing page renders correctly', () => {
  const { getByTestId } = render(<NotLoggedInLandingPage />);
  const landingPage = getByTestId('landing');
  expect(landingPage).toBeDefined();
});

