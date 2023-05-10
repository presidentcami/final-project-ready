import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './routes/Navbar'
import ListStudents from './components/ListStudents'
import { useState } from 'react';


function App() {

  const [user, setUser] = useState(null)
  console.log("this is current user", user)
  return (
    <div className="App">
      <MyNavBar setUser={setUser} user={user} />
      <ListStudents />

    </div>
  )
}

export default App
