import './App.css'

import { Navbar } from './Component/Navbar';
import { Footer } from './Component/Footer';
import { Outlet } from 'react-router';
import { useEffect } from 'react';

function App() {

  useEffect(()=>{
    window.scrollTo(0,0);
  })

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
