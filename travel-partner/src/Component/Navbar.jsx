import logo from '../assets/travl partner-2.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './NavBar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import { useAuthContext } from '../Hooks/useAuthContext';
import { useRef, useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Navbar = () => {
    const location = useLocation();
    const { user, dispatch } = useAuthContext();
    const navigate = useNavigate();
    const [toggleNavbar, setToggleNavbar] = useState(false);
    const navRef = useRef();

    const HandleLogOut = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/log-out`, {
            credentials: 'include'
        })
        if (response.ok) {
            toast.success("Logged-out Successfully");
            dispatch({ type: 'LOGOUT' });
            localStorage.removeItem('jwt');
            console.log("log out succes");
            navigate('/');
        }
        else {
            toast.error("Error Logging Out");
        }
    }

    useEffect(() => {
        const HandleClickOutside = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setToggleNavbar(false);
            }
        }
        document.addEventListener('mousedown', HandleClickOutside);
        return () => { document.removeEventListener('mousedown', HandleClickOutside); };
    }, []);

    return (
        <nav className={`navbar ${toggleNavbar ? 'active' : ''}`}>
            <ToastContainer />
            <Link to={'/'} onClick={() => setToggleNavbar(false)}>
                <img src={logo} alt="IMAGE" />
            </Link>
            <div className='nav-button-container'>
                {!toggleNavbar && <IconMenu onClick={() => setToggleNavbar(!toggleNavbar)} />}
                {toggleNavbar && <IconCross onClick={() => setToggleNavbar(!toggleNavbar)} />}
            </div>
            <div className='nav-item-container' ref={navRef}>
                <div className="nav-links-container">
                    {location.pathname !== '/' && <Link to={'/'} className='nav-links' onClick={() => setToggleNavbar(false)}>
                        Home</Link>}
                    <Link to={'/flights'} className='nav-links' onClick={() => setToggleNavbar(false)}>
                        Flights</Link>
                    <Link to={'/'} className='nav-links' onClick={() => setToggleNavbar(false)}>
                        Hotel</Link>
                    <Link to={'/manage-booking/search'} className='nav-links' onClick={() => setToggleNavbar(false)}>
                        Manage</Link>
                </div>
                {user !== null ?
                    <div className='user-login-container'>
                        <Link to={`/dashboard/${user?._id}`} className='user-info' onClick={() => setToggleNavbar(false)}>
                            <FontAwesomeIcon icon={faUser} /> <span> {user?.name} </span>
                        </Link>
                        <button className='user-info user-logout' onClick={HandleLogOut}>Logout</button>
                    </div>
                    :
                    <div className='user-login-container'>
                        <Link to={'login'} className='user-info login' onClick={() => setToggleNavbar(false)}>
                            LogIn</Link>
                        or
                        <Link to={'/signup'} className='user-info signup'
                            onClick={() => setToggleNavbar(false)}>
                            SignUp</Link>
                    </div>
                }
            </div>
        </nav>
    )
}


function IconMenu(props) {
    return (
        <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="1em"
            width="1em"
            {...props}
        >
            <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z" />
        </svg>
    );
}
function IconCross(props) {
    return (
        <svg
            viewBox="0 0 21 21"
            fill="currentColor"
            height="1em"
            width="1em"
            {...props}
        >
            <g
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M15.5 15.5l-10-10zM15.5 5.5l-10 10" />
            </g>
        </svg>
    );
}
