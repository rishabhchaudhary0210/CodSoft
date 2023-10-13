import { useEffect, useState } from 'react';
import { UserDetail } from '../Booking/BookingDone';
import { Loader } from '../../Component/Loader';
import './StyleSheet/dashBoard.css';

export const Dashboard = () => {

  const [bookingDetails, setBookingDetails] = useState([]);

  useEffect(()=>{
    const getApiData = async ()=>{
      // const response = await fetch('http://localhost:8080/user-bookings',{
      //   credentials:'include'
      // });
      const response = await fetch('http://localhost:8080/user/get-user',{
        credentials:'include'
      });
      const apiData = await response.json();

      setBookingDetails(apiData.bookingDetails);
      console.log(apiData);
    }
    getApiData();
  },[])

  return (
    <div className='dashboard-container'>
      <h1>Hey, John</h1>
      <h5>Here are your recent booking details</h5>
      {
      (bookingDetails?.length === 0) ? <Loader /> :
      bookingDetails?.length > 0 &&
      bookingDetails?.map(ele => {
        const obj = JSON.parse(ele.obj);
        console.log(obj);
        return obj.data.travelers.map((m, index) => <UserDetail index={index} key={m.id} ele={m} obj={obj.data.flightOffers[0].travelerPricings} />) 
      })

    }</div>
  )
}
