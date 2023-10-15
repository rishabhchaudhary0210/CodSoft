import './App.css'

import FlightSearch from './Pages/Flightsearch/FlightSearch';
import { Navbar } from './Component/Navbar';
import { Footer } from './Component/Footer';
import { Outlet } from 'react-router';

function App() {


  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
