// import homeBg from '../../assets/johny-greenbg.jpg';
import './home.css'
// import planeService from '../../assets/airplane-takeoff.png';
import planeService from '../../assets/large-airplane.png';
import compareService from '../../assets/money-balance-scale.jpg';
import priceService from '../../assets/realistic-label.png';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export const Home = () => {
  // const titleRef = useRef();

  // const handleScroll = () => {
  //   const scrollPosition = window.scrollY; // => scroll position
  //   // setScrolled(window.scrollY);

  //   titleRef.current.style.transform = `translateX(${window.scrollY})`;
  // };
  // useEffect(() => {
  //   handleScroll();
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <div className='home-container'>
      <div className='home-header-container'>
        <div className="home-header-subcont">
          <h1 className='header'>
            Explore best flight offers to your favourite destinations.
          </h1>
          <Link to='/flights' className='flight-link'>
            <p>Explore Flights</p>
            <FontAwesomeIcon icon={faPlane} />
          </Link>
          {/* <h2 ref={titleRef} className='title'>TRAVEL PARTNER</h2> */}
        </div>
      </div>

      <div className="manage-booking-link">
        <span>
          Click here to view or update your booking details.
        </span>
        <Link to={'/manage-booking/search'} className='link'>Manage Booking</Link>
      </div>

      <div className='home-service-container'>
        <div className="service-box">
          <img src={planeService} alt="plane" />
          <p>
            Explore the best flight offers from anywhere to everywhere and complete your bookings with our partners.
          </p>
        </div>
        <div className="service-box">
          <img src={compareService} alt="compare" />
          <p>
            Compare flight deals from over multiple providers, and choose the cheapest, fastest or greenest tickets.
          </p>
        </div>
        <div className="service-box">
          <img src={priceService} alt="price" />
          <p>
            Find the cheapest month - or even day - to fly, and set up Price Alerts to book when the price is right
          </p>
        </div>
      </div>
      <div className='hotel-info-container'>
        <h1>Book your relaxing stay here.</h1>
        <h5>Choose from the range of top Hotel Deals and get an amazing room at an even better price.</h5>
        <Link to='/' className='hotel-link'>Find Rooms</Link>
      </div>
    </div>
  )
}
