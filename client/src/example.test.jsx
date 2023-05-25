
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

// this test passes when i comment out the isLoading function
test('Navbar renders correctly', () => {
  render(<MyNavBar user={user} />);
  const navbarElement = screen.getByTestId('navbar');
  // console.log("navbar element in test jsx", navbarElement)https://www.google.com/search?sxsrf=APwXEde4zURwLLC52tvNK3-wOjfUKDeaJw:1684955006077&q=react+testing+library+render+props&tbm=shop&sa=X&ved=2ahUKEwjp1uXE0o7_AhVKEVkFHZClBREQ0pQJegQICRAB
  expect(navbarElement).toBeDefined();
});

test('Without user landing page renders correctly', () => {
  const { getByTestId } = render(<NotLoggedInLandingPage />);
  const landingPage = getByTestId('landing');
  expect(landingPage).toBeDefined;
});

test('Loading page renders', () => {
  
})

