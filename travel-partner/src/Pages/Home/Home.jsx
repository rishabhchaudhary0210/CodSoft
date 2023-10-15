// import homeBg from '../../assets/johny-greenbg.jpg';
import './home.css'
import planeService from '../../assets/airplane-takeoff.png';
import compareService from '../../assets/money-balance-scale.jpg';
import priceService from '../../assets/realistic-label.png';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export const Home = () => {
    const titleRef = useRef();
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY; // => scroll position
      // setScrolled(window.scrollY);
      
      titleRef.current.style.transform = `translateX(${window.scrollY})`;
    };
    useEffect(() => {
      handleScroll();
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    return (
      <div className='home-container'>
        <div className='home-header-container'>
          <h1 className='header'>
            Search the best flight offers from anywhere to everywhere.
          </h1>
          <Link to='/flights' className='flight-link'>
            <p>Explore Flights</p>
            <FontAwesomeIcon icon={faPlane} />
          </Link>
          <h2 ref={titleRef} className='title'>TRAVEL PARTNER</h2>
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
      </div>
    )
  }
