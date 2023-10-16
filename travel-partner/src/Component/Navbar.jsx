import logo from '../assets/travl partner-2.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './NavBar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import { useAuthContext } from '../Hooks/useAuthContext';

export const Navbar = () => {
    const location = useLocation();
    const { user, dispatch } = useAuthContext();
    const navigate = useNavigate();

    const HandleLogOut = async ()=>{
        console.log('locou click');
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/log-out`, {
            credentials:'include'
        })
        dispatch({type:'LOGOUT'});
        navigate('/');
    }

    return (
        <nav className={(location.pathname === '/') ? 'onHome' : ''}>
            <Link to={'/'}>
                <img src={logo} alt="IMAGE" />
            </Link>
            {user !== null ?
                <div className='user-login-container'>
                    <Link to={`/dashboard/${user?._id}`} className='user-info'>
                            <FontAwesomeIcon icon={faUser} /> <span> {user?.name} </span>
                    </Link>
                    <button className='user-info user-logout' onClick={HandleLogOut}>Logout</button>
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
