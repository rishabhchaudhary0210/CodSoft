import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { BookingDetails } from './Pages/Booking/BookingDetails.jsx';
import { BookingDone } from './Pages/Booking/BookingDone.jsx';
import FlightSearch from './Pages/Flightsearch/FlightSearch.jsx'
import { Dashboard } from './Pages/User/Dashboard.jsx';
import { SignUp } from './Pages/User/SignUp.jsx';
import { Login } from './Pages/User/Login.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Error Recieved</div>,
    children:[
      {
        path:'/',
        element: <FlightSearch />
      },
      {
        path:"/flight-booking/:id",
        element:<BookingDetails />,
        errorElement: <div>Booking Details error</div>
      },
      {
        path:"/test",
        element: <h1>App Working Fine !!!</h1>,
        errorElement: <div>Errorrrrrrr!!!</div>
      },
      {
        path:"/flight-confirm/:id",
        element: <BookingDone />,
        errorElement: <div>Confirmation Error</div>
      },
      {
        path:'/dashboard/:id',
        element: <Dashboard />
      },
      {
        path:'/signup',
        element: <SignUp />
      },
      {
        path:'/login',
        element: <Login />
      },
    ]
  },
  

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Navbar /> */}
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
