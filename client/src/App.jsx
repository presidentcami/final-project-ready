import { useState } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './routes/Navbar'
import Homepage from './components/Homepage'
import Profile from './components/Profile';
import { Route, Routes } from 'react-router-dom';



function App() {

  const [user, setUser] = useState(null)
  console.log("this is current user", user)
  return (
    <div className="App">
      <MyNavBar setUser={setUser} user={user} />
      {user ? <Profile user={user} /> :  <Homepage />}

    </div>
  )
}

export default App
