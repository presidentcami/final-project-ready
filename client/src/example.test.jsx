import MyNavBar from './routes/Navbar.jsx';
import {expect, test } from 'vitest';
import {getByRole, render, screen, waitFor, fireEvent } from '@testing-library/react';
import NotLoggedInLandingPage from './components/NotLoggedInLandingPage';
import PageLoader from './components/PageLoader.jsx';
import Profile from './components/Profile.jsx';
import AddTrip from './components/AddNewTrip.jsx';
import Sidebar from './components/Sidebar.jsx';
import { MemoryRouter } from 'react-router-dom';
import ChangeInfo from './components/ChangeInfo.jsx';

//Navbar rendering
const user = [{
  user_auth0_nickname: "testuser",
  user_created: "2023-05-09T21:55:22.122Z",
  user_email: "testuser@gmail.com",
  user_first_name: "Test",
  user_id: 1,
  user_last_name: "User",
  user_username: null
}]

const setUser = vi.fn();
const handleSubmit = vi.fn();

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
  const { getByTestId } = render(<PageLoader />);
  const loadingPage = getByTestId('loading-page');
  expect(loadingPage).toBe;
});

test('Dashboard shows add new trip form', () => {
  const { getByText } = render(<AddTrip />)
  const addNewTripForm = getByText('Add New Trip');
  expect(addNewTripForm).toBe;
})

test("renders Sidebar component correctly", () => {
  const trips = [
   {
     trip_id: 3,
     trip_name: 'Down the Shore',
     trip_start_date: '2023-08-12',
     trip_end_date: '2023-08-19',
     location: 'Sea Isle City',
     user_id: 1,
     trip_description: 'Family vacation with my partner Joe and his parents. We go every year, stay at a house and hit up the beach.',
     trip_created: '2023-05-16T21:13:35.368Z'
   }
 ];

  render(
  <MemoryRouter>
    <Sidebar trips={trips} user={user} />
  </MemoryRouter>
  );
});


test("renders Profile component correctly", () => {

  const { getByText } = render(<Profile user={user} />);

  const fullName = getByText("Test User");
  const welcomeMessage = getByText(
    "Welcome to your homepage, user at testuser@gmail.com"
  );
  const dashboardMessage = getByText("Go to your Dashboard to add a new trip!");

  expect(fullName).toBe;
  expect(welcomeMessage).toBe;
  expect(dashboardMessage).toBe;
});

test("renders ChangeInfo component with user data in form", async () => {

  render(<ChangeInfo user={user} setUser={setUser} />);

   expect(screen.getByLabelText("Email Address").value).toBe("testuser@gmail.com");
   expect(screen.getByLabelText("First Name").value).toBe("Test");
   expect(screen.getByLabelText("Last Name").value).toBe("User");
});