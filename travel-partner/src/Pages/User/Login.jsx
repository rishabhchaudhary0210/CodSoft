import { Link, useNavigate } from 'react-router-dom';
import './StyleSheet/signup.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'

import {useAuthContext} from '../../Hooks/useAuthContext'

export const Login = () => {
    const { dispatch } = useAuthContext();
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const HandleUserLogIn = async (e) => {
        e.preventDefault();
        const user = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        const res = await fetch('http://localhost:8080/user/log-in', {
            method: 'POST',
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await res.json();
        if(res.ok){
            console.log('login Response Success',data);
            dispatch({type:'LOGIN', payload:data.user});
            navigate('/');
        }
        if(data.error !== null){
            setLoginError(data.error);
            console.log("Error recieved");
            return;
        }
        console.log(user);
    }

    return (
        <div className='login-form-container'>
            <h1>LOG IN</h1>
            <form onSubmit={HandleUserLogIn} action="" method='POST'>
                <div className='form-input'>
                    <input type='email' id="email" name='email' placeholder="Enter Your Email-ID" />
                    <label htmlFor="email">Email</label>
                </div>
                <div className='form-input password'>
                    <input type={!showPassword ? 'password' : 'text'} name="password" id="password" required placeholder='Enter Your Password' />
                    <label htmlFor="password">Password</label>
                    <span onClick={() => setShowPassword(!showPassword)}>{showPassword
                        ? <FontAwesomeIcon icon={faEye} /> :
                        <FontAwesomeIcon icon={faEyeSlash} />}</span>
                </div>
                <button type='submit' className='login-btn'>Log In</button>
            </form>
            <p>
                Not an existing user ? <Link to="/signup">Sign-Up</Link>
            </p>
            <p>
                Can't remember your password ? <Link to="/forgotpassword">Forgot Password</Link>
            </p>
        </div>
    )
}
