import { useEffect, useState } from 'react';
import { UserDetail } from '../Booking/BookingDone';
import { Loader } from '../../Component/Loader';
import './StyleSheet/dashBoard.css';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../Hooks/useAuthContext';

export const Dashboard = () => {
  const [dashboardError, setDashboardError] = useState(null);
  const [bookingDetails, setBookingDetails] = useState([]);
  const { id } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    const getApiData = async () => {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/booking-details/${id}`, {
        credentials: 'include'
      });

      const apiData = await response.json();

      if (!response.ok) {
        setDashboardError(apiData?.error);
      }
      if (response.ok) {
        setDashboardError(null);
        setBookingDetails(apiData.bookingDetails);
      }

      console.log(apiData);
    }
    getApiData();
  }, [])

  return (
    user !== null &&
    <div className='dashboard-container'>
      <h1>Hey, {user?.name}</h1>
      {dashboardError === null ?
        <div className='dashboard-container-subdiv'>
          <h5>Here are your recent booking details</h5>
          {
            (bookingDetails?.length === 0) ? <Loader /> :
              bookingDetails?.length > 0 &&
              bookingDetails?.map(ele => {
                const obj = JSON.parse(ele.obj);
                console.log(obj);
                return (
                  obj.data.travelers.map((m, index) =>
                    <Link
                      to={`/manage-booking/${obj.data.id}`}
                      key={m.id}
                      className='link'
                    >
                      <UserDetail
                        index={index}
                        ele={m}
                        obj={obj.data.flightOffers[0].travelerPricings}
                      />
                    </Link>
                  ))
              })
          }
        </div>
        :
        <div className="dashboard-error-container">
          {dashboardError}
        </div>
      }
    </div>
  )
}
