import { useEffect, useState } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './components/Profile';
import { Route, Routes } from 'react-router-dom';
import AllTrips from './components/AllTrips';
import OneTrip from './components/OneTrip';
import Layout from './components/Layout';
import ChangeInfo from './components/ChangeInfo';



function App() {

  const [user, setUser] = useState(null)
  const [trips, setTrips] = useState([])

    const loadTrips = (userid) => {
      // A function to fetch the list of students that will be load anytime that list change
      fetch(`http://localhost:8080/trips/${userid}`)
        .then((response) => response.json())
        .then((trips) => {
          // console.log('trips in app', trips)
          setTrips(trips);
        });
    };

    useEffect(() => {
      if (user && user.length) {
        const tripsData = loadTrips(user[0].user_id);
        setTrips(tripsData);
      }
    }, [user]);

  // console.log("this is current user", user)

  return (
   
      <Routes className="App">
        <Route path='/' element={<Layout setUser={setUser} user={user} trips={trips} setTrips={setTrips} />}>
            
            <Route path='dashboard' element={<Profile user={user} setTrips={setTrips} trips={trips} />} />
            <Route path='dashboard/profile'  element={<ChangeInfo user={user} />} />
            <Route path='trips' element={<AllTrips user={user} setTrips={setTrips} trips={trips} />} />
            <Route path='trips/:trip_id' element={<OneTrip />} />
        </Route>
      </Routes>
    
  )
}

export default App
