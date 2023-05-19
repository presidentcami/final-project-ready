import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import PageLoader from "../components/PageLoader";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import styled from 'styled-components'

const addUser = (auth0User, setUser) => {
  const { email, family_name, given_name, nickname } = auth0User;

  const userObj = {
    email: email,
    given_name: given_name,
    family_name: family_name,
    nickname: nickname,
  };
  //  console.log("testing userObj", userObj);

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
        // console.log(user);
        setUser(user);
      });
  } catch (error) {
    console.error(error.message);
  }
};

  const Button = styled.button`
    border-radius: 10px;
    border: none;
    background-color: #fddc95;
    margin: 5px;
    margin-right: 3rem;
  `;

  const ButtonsDiv = styled.div`
    position: fixed;
    right: 0;
  `;

function MyNavBar({ user, setUser }) {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user: auth0User,
    isLoading,
  } = useAuth0();

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

  useEffect(() => {
    if (auth0User) addUser(auth0User, setUser);
  }, [auth0User]);

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  console.log(user);
  return (
    <nav data-testid="navbar" className="navbar">
    
        {!user ? null : (
          <Nav.Link to="/user-profile">
            {user[0].user_first_name} {user[0].user_last_name}
          </Nav.Link>
        )}
        {!isAuthenticated ? (
          <ButtonsDiv>
            <Button onClick={() => loginWithRedirect()}>Log In</Button>{" "}
            <Button onClick={handleSignUp}>Sign Up</Button>
          </ButtonsDiv>
        ) : (
          <Button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </Button>
        )}

      {/* <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          {!user ? null : (
            <Nav.Link to="/user-profile">
              {user[0].user_first_name} {user[0].user_last_name}
            </Nav.Link>
          )}
          <Navbar.Toggle />
          <Navbar.Collapse></Navbar.Collapse>
        </Container>
      </Navbar> */}
    </nav>
  );
}

export default MyNavBar;
