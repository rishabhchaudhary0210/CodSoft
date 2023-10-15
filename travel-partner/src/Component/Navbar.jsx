import logo from '../assets/travl partner-2.png'
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useState} from 'react';

export const Navbar = () => {
    const [isAuth, setIsAuth] = useState(false);
    const location = useLocation();

    return (
        <nav className={(location.pathname === '/') ? 'onHome' : ''}>
            <Link to={'/'}>
                <img src={logo} alt="IMAGE" />
            </Link>
            {isAuth ?
                <div className='user-login-container'>
                    <Link to={'/dashboard/id'} className='user-info'>
                            <FontAwesomeIcon icon={faUser} /> <span> John Wick </span>
                    </Link>
                </div>
                :
                <div className='user-login-container'>
                    <Link to={'/signup'} className='user-info'>SignUp</Link>
                    or
                    <Link to={'login'} className='user-info'>LogIn</Link>
                </div>
            }
        </nav>
    )
}
