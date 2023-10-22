/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { UserDetail } from '../Booking/BookingDone';
import { Loader } from '../../Component/Loader';
import './StyleSheet/dashBoard.css';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { FaPlane } from 'react-icons/fa';


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
                return (
                  obj.data.travelers.map((m, index) =>
                    <Link
                      to={{ pathname: `/manage-booking/${obj.data.id}`, search: `?userId=${user?._id}&flightdbId=${ele._id}` }}
                      key={m.id}
                      className='link'
                    >
                      <FlightDetails object={obj} />

                      {/* <UserDetail
                        index={index}
                        ele={m}
                        obj={obj.data.flightOffers[0].travelerPricings}
                      /> */}
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

export const FlightDetails = ({ object }) => {
  // console.log("OBJEC from new com = ",object)
  // <h1>New COmp</h1>
  return (
    <div className="flight-details-container">
      <div className='flight-itr-box'>
        {
          object.data.flightOffers[0].itineraries.map((ele, index) =>
            <div className='flight-seg-box' key={index}>
              {console.log("From = ", ele.segments[0])}
              <div className='airport-box'>
                <p>
                {ele.segments[0].departure.iataCode}
                </p>
                <span>
                  {ele.segments[0].departure.at.substring(0, 10)}
                  <br />
                  {ele.segments[0].departure.at.substring(11)}
                </span>
              </div>
              <span> <hr /><FaPlane /> </span>
              <div className='airport-box'>
                <p>
                  {ele.segments[ele.segments.length - 1].arrival.iataCode}
                </p>
                <span>
                  {ele.segments[ele.segments.length - 1].arrival.at.substring(0, 10)}
                  <br />
                  {ele.segments[ele.segments.length - 1].arrival.at.substring(11)}
                </span>
              </div>
            </div>
          )
        }
      </div>
      <div className="flight-trav-box">
        <h3>Travellers : </h3>
        {
          object.data.travelers.map((ele, index) =>
            <div className="trav-info-box" key={index * 10}>
              <span>{(ele.gender === 'MALE') ? 'Mr. ' : 'Ms. '}{ele.name.firstName + " " + ele.name.lastName}</span>
              <span>{object.data.flightOffers[0].travelerPricings[index].travelerType}</span>
            </div>
          )
        }
      </div>
    </div>
  );
}