import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import PageLoader from '../components/PageLoader';
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react';

  const addUser = (auth0User, setUser) => {
    const { email, family_name, given_name, nickname } = auth0User

    const userObj =  {
     email: email,
     given_name: given_name,
     family_name: family_name,
     nickname: nickname,
   };
   console.log("testing userObj", userObj);

   try {
     fetch("http://localhost:8080/adduser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(userObj),
    })
      .then((response) => {
        console.log("Response from post method ", response);
        return response.json();
      })
      .then((user) => {
        console.log(user);
        setUser(user)
      });
   } catch (error) {
    console.error(error.message)
   }

  }

  // const getUser = (auth0User, setUser) => {
  //   // A function to fetch the list of students that will be load anytime that list change
  //   const { email } = auth0User
  //   fetch(`/user/${email}`)
  //     .then((response) => response.json())
  //     .then((user) => {
  //       setUser(user);
  //     })
  //   }

function MyNavBar({ user, setUser }) {
  const { loginWithRedirect, logout, isAuthenticated, user: auth0User, isLoading } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  useEffect(() => {

    if (auth0User) addUser(auth0User, setUser)
      // getUser(auth0User, setUser)} ;
  }, [auth0User])

  console.log(auth0User)
  return (
    <>
      <Navbar data-testid="navbar" bg="dark" variant="dark" sticky="top">
        <Container>
          {/* <Navbar.Brand href="/">
            <img
              src={Logo}
              height="30"
              className="d-lg-inline-block"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand> */}
          {!user ? null : <Nav.Link to="/user-profile">{user[0].user_first_name} {user[0].user_last_name}</Nav.Link>}
          {/* <Nav.Link >Your Link</Nav.Link> */}
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {!isAuthenticated ? <div><button onClick={() => loginWithRedirect()}>Log In</button> <button onClick={handleSignUp}>
              Sign Up
            </button>
            </div> : <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
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