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
                    {/* <div className='login-button'>
                    LogIN
                </div> */}
                    <Link to={'/dashboard/id'}>
                        <div className='user-info'>
                            <FontAwesomeIcon icon={faUser} /> <span> John Wick </span>
                        </div>
                    </Link>
                </div>
                :
                <div>
                    <Link to={'/signup'}>SignUp</Link>
                    or
                    <Link to={'login'}>LogIn</Link>
                </div>
            }
        </nav>
    )
}
