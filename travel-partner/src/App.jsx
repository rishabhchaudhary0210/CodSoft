import './App.css'

import FlightSearch from './Pages/Flightsearch/FlightSearch';
import { Navbar } from './Component/Navbar';
import { Outlet } from 'react-router';

function App() {


  return (
    <>
      <Navbar />
      {/* <FlightSearch /> */}
      <Outlet />
    </>
  )
}

export default App
