import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthContextProvider } from './Context/AuthContext.jsx';

import { BookingDetails } from './Pages/Booking/BookingDetails.jsx';
import { BookingDone } from './Pages/Booking/BookingDone.jsx';
import FlightSearch from './Pages/Flightsearch/FlightSearch.jsx'
import { Dashboard } from './Pages/User/Dashboard.jsx';
import { SignUp } from './Pages/User/SignUp.jsx';
import { Login } from './Pages/User/Login.jsx';
import { ForgotPassword } from './Pages/User/ForgotPassword.jsx';
import { Home } from './Pages/Home/Home.jsx';
import { ManageBooking } from './Pages/Booking/ManageBooking.jsx';
import HotelSearch from './Pages/Hotel/HotelSearch.jsx'
import HotelDisplay from './Pages/Hotel/HotelDisplay.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Error Recieved</div>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/flights',
        element: <FlightSearch />
      },
      {
        path: "/flight-booking/:id",
        element: <BookingDetails />,
        errorElement: <div>Booking Details error</div>
      },
      {
        path: "/test",
        element: <h1>App Working Fine !!!</h1>,
        errorElement: <div>Errorrrrrrr!!!</div>
      },
      {
        path: "/flight-confirm/:id",
        element: <BookingDone />,
        errorElement: <div>Confirmation Error</div>
      },
      {
        path: '/manage-booking/:id',
        element: <ManageBooking />
      },
      {
        path: '/dashboard/:id',
        element: <Dashboard />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/forgotpassword',
        element: <ForgotPassword />
      },
      {
        path: '/hotel',
        element: <HotelSearch />
      },
      {
        path: '/hotel-display',
        element: <HotelDisplay />
      }
    ]
  },


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>,
)
