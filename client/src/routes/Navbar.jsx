import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from '../assets/BlueTechtonicaWord.png'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react';

  const getUser = (auth0User, setUser) => {
    // A function to fetch the list of students that will be load anytime that list change
    const { email } = auth0User
    fetch(`/api/user/${email}`)
      .then((response) => response.json())
      .then((user) => {
        setUser(user);
      })
    }

function MyNavBar({ user, setUser }) {
  const { loginWithRedirect, logout, isAuthenticated, user: auth0User } = useAuth0();

  useEffect(() => {
    if (auth0User) getUser(auth0User, setUser);
  }, [auth0User])

  console.log(auth0User)
  return (
    <>
      <Navbar data-testid="navbar" bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={Logo}
              height="30"
              className="d-lg-inline-block"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          {!user ? null : <Nav.Link to="/user-profile">{user[0].user_first_name} {user[0].user_last_name}</Nav.Link>}
          {/* <Nav.Link >Your Link</Nav.Link> */}
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {!isAuthenticated ? <button onClick={() => loginWithRedirect()}>Log In</button> : <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Log Out
            </button>}

            {/* <Navbar.Text>
            Signed in as: <a href="#login">Cristina Rodriguez</a>
          </Navbar.Text> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavBar;