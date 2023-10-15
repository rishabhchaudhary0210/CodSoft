import './Footer.css';
import logo from './../assets/travl partner-2.png';
import { Link } from 'react-router-dom';

export const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer>
            <div className='list-container'>
                <img src={logo} alt="logo" />
                <div className='list-items-container'>
                    <div className='list-items'>
                        <Link to={'/'} className='link'>About Us</Link>
                        <Link to={'/'} className='link'>Contact Us</Link>
                        <Link to={'/'} className='link'>Terms of Service</Link>
                    </div>
                    <div className='list-items'>
                        <Link to={'/flights'} className='link'>Explore Flights</Link>
                        <Link to={'/signup'} className='link'>Register</Link>
                        <Link to={'/login'} className='link'>LogIn</Link>
                    </div>
                </div>
            </div>
            <h5 className='footer-copy'>
                &copy; Copyright Travel Partner {year}.
            </h5>
        </footer>
    )
}
