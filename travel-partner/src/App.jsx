import './App.css'

import { Navbar } from './Component/Navbar';
import { Footer } from './Component/Footer';
import { Outlet } from 'react-router';

function App() {


  return (
    <>
      <Navbar />
      <div className='app-container'>
        <Outlet className='outlet' />
      </div>
      <Footer />
    </>
  )
}

export default App
