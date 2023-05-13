import { useState } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './routes/Navbar'
import Homepage from './components/Homepage'
import Profile from './components/Profile';
import { Route, Routes, Navigate } from 'react-router-dom';
import AllTrips from './components/AllTrips';
import OneTrip from './components/OneTrip';



function App() {

  const [user, setUser] = useState(null)
  const [trips, setTrips] = useState([])

  console.log("this is current user", user)
  return (
    <div className="App">
      <MyNavBar setUser={setUser} user={user} />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        {user && 
        <Route
          exact path="/dashboard"
          element={<Profile user={user} setTrips={setTrips} trips={trips} />}
        >
          <Route path='/dashboard/trips' element={<AllTrips trips={trips} />} />
          <Route path='/dashboard/trips/:trip_id' element={<OneTrip />} />
        </Route>}
        
      </Routes>
    </div>
  )
}

export default App
