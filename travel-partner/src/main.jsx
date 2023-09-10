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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Error Recieved</div>,
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
    path:"/flight-confirm",
    element: <BookingDone />,
    errorElement: <div>Confirmation Error</div>
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
