import logo from '../assets/travl partner-2.png'
import { Link } from 'react-router-dom';
import './NavBar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export const Navbar = () => {
    return (
        <nav>
            <Link to={'/'}>
                <img src={logo} alt="IMAGE" />
            </Link>
            <div className='user-login-container'>
                {/* <div className='login-button'>
                    LogIN
                </div> */}
                <Link to={'/dashboard/id'}>
                    <div className='user-info'>
                        <FontAwesomeIcon icon={faUser} />
                        UserName
                    </div>
                </Link>
            </div>
        </nav>
    )
}
