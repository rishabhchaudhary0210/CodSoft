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
  const [headerVisible, setHeaderVisible] = useState(false);
  const [serviceVisible, setServiceVisible] = useState(false);
  const headerRef = useRef();
  const serviceContainerRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
    //header Red
    const observer1 = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting === true) {
        console.log("visible")
        setHeaderVisible(true);
      }
      else{
        console.log("Hidden")
      }
    })
    observer1.observe(headerRef.current);
    //services ref
    const observer2 = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting === true) {
        setServiceVisible(true);
        console.log("Service visible")
      }
      else{
        console.log("service hidden")
      }
    })
    observer2.observe(serviceContainerRef.current);
  }, [])

  return (
    <div className='home-container'>
      <div ref={headerRef} className='home-header-container'>
        <div className={`home-header-subcont ${headerVisible ? 'animate-incoming' : ''}`}>

          <h1 className={`header ${headerVisible ? 'animate-opacity' : ''}`}>
            Explore best flight offers to your favourite destinations.
          </h1>
          <Link to='/flights' className={`flight-link ${headerVisible ? 'animate-opacity' : ''}`}>
            <p>Explore Flights</p>
            <FontAwesomeIcon icon={faPlane} />
          </Link>
          {/* <h2 ref={titleRef} className='title'>TRAVEL PARTNER</h2> */}
        </div>
      </div>

      <div className={`manage-booking-link  ${serviceVisible ? 'animate-opacity' : ''}`}>
        <span>
          Click here to view or update your booking details.
        </span>
        <Link to={'/manage-booking/search'} className={`link`}>Manage Booking</Link>
      </div>

      <div ref={serviceContainerRef} className={`home-service-container ${serviceVisible ? 'animate-opacity' : ''}`}>
        <div style={{"animationDelay":"0s",'animationDuration':'0.6s'}} className={`service-box ${serviceVisible ? 'animate-opacity' : ''}`}>
          <img src={planeService} alt="plane" />
          <p>
            Explore the best flight offers from anywhere to everywhere and complete your bookings with our partners.
          </p>
        </div>
        <div style={{"animationDelay":"0.4s",'animationDuration':'0.6s'}} className={`service-box ${serviceVisible ? 'animate-opacity' : ''}`}>
          <img src={compareService} alt="compare" />
          <p>
            Compare flight deals from over multiple providers, and choose the cheapest, fastest or greenest tickets.
          </p>
        </div>
        <div style={{"animationDelay":"0.4ss",'animationDuration':'0.6s'}} className={`service-box ${serviceVisible ? 'animate-opacity' : ''}`}>
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
