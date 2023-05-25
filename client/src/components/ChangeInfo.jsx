import React, {useReducer} from 'react'
import styled from 'styled-components';


const initialValue = {
  user_email: "",
  user_first_name: "",
  user_last_name: "",
  user_username: "",
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'update': 
        return {
            ...state,
            [action.payload.key]: action.payload.value,
        };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};

  const Button = styled.button`
    border-radius: 10px;
    border: none;
    background-color: #fddc95;
    margin: 5px;
    font-family: "Lato", sans-serif;
    font-weight: lighter;
  `;

const ChangeInfo = ({ user, setUser }) => {

    const { user_id, user_email, user_first_name, user_last_name, user_username } = user[0]
    // console.log(user)
    const [state, dispatch] = useReducer(reducer, initialValue);
    // useremail read only, change first and last name or add it and add username

    const inputAction = (e) => {
        e.preventDefault();

        dispatch({
            type: 'update',
            payload: { key: e.target.name, value: e.target.value }
        });
        initialValue.user_email = user_email;
        initialValue.user_first_name = user_first_name;
        initialValue.user_last_name = user_last_name;
        initialValue.user_username = user_username;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
                try {
                  fetch(`http://localhost:8080/edituser/${user_id}`, {
                    method: "PUT",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(state),
                  })
                    .then((response) => response.json())
                    .then((user) => {
                      setUser(user);
                      // console.log("user details fetched when current user is updated",user);
                    });
                  // console.log(state)
                  // window.location = "/";
                } catch (error) {
                  console.error(error.message);
                }
    }

  return (
    <div className="profile">
      <form onSubmit={handleSubmit}>
        <h3>Your Profile</h3>
        <div>
          <label>Email Address</label>
        </div>
        <input
          type="text"
          id="update-trip_name"
          name="user_email"
          defaultValue={user_email}
          readOnly
          // style={{lineHeight: '50px'}}
        />
        <div>
          <label>First Name</label>
        </div>
        <input
          type="text"
          id="update-first-name"
          name="user_first_name"
          defaultValue={user_first_name}
          onChange={inputAction}
        />
        <div>
          <label>Last Name</label>
        </div>
        <input
          type="text"
          id="update-last-name"
          name="user_last_name"
          defaultValue={user_last_name}
          onChange={inputAction}
        />
        <div>
          <label>Username</label>
        </div>
        <input
          type="text"
          id="update-user-name"
          name="user_username"
          defaultValue={user_username}
          onChange={inputAction}
        />
        <section>
          <Button type="submit">Submit Changes</Button>
        </section>
      </form>
    </div>
  );
}

export default ChangeInfo