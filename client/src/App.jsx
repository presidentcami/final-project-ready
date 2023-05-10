import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './routes/Navbar'
import Homepage from './components/Homepage'
import { useState } from 'react';
import Profile from './components/Profile';


function App() {

  const [user, setUser] = useState(null)
  console.log("this is current user", user)
  return (
    <div className="App">
      <MyNavBar setUser={setUser} user={user} />
      {user ? <Profile user={user} /> :  <Homepage />}
      {/* <ListStudents /> */}

    </div>
  )
}

export default App
