import { useState } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './routes/Navbar'
import Homepage from './components/NotLoggedInLandingPage'
import Profile from './components/Profile';
import { Route, Routes, Navigate } from 'react-router-dom';
import AllTrips from './components/AllTrips';
import OneTrip from './components/OneTrip';
import Layout from './components/Layout';



function App() {

  const [user, setUser] = useState(null)
  const [trips, setTrips] = useState([])

  console.log("this is current user", user)
  return (
   
      <Routes className="App">
        <Route path='/' element={<Layout setUser={setUser} user={user} trips={trips} setTrips={setTrips} />}>
            
            <Route path='dashboard' element={<Profile user={user} setTrips={setTrips} trips={trips} />} />
            <Route path='trips' element={<AllTrips trips={trips} />} />
            <Route path='trips/:trip_id' element={<OneTrip />} />
        </Route>
      </Routes>
    
  )
}

export default App
