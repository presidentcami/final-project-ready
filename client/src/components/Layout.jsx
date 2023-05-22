import React from 'react'
import MyNavBar from '../routes/Navbar'
import NotLoggedInLandingPage from './NotLoggedInLandingPage'
import SideBar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = ({ setUser, user, trips, setTrips }) => {
  return (
        <div>
          <MyNavBar setUser={setUser} user={user}/>

            {!!user ? (
            <div style={{ flex: true }}>
              <SideBar trips={trips} setTrips={setTrips} />
            <Outlet />
        </div>
    ) : <NotLoggedInLandingPage />}
    </div >
  )
}

export default Layout