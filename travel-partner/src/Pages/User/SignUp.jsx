import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link, useNavigate } from 'react-router-dom';
import './StyleSheet/signup.css';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'

import { useAuthContext } from '../../Hooks/useAuthContext';

export const SignUp = () => {
    const { dispatch } = useAuthContext();
    const phoneLabel = useRef();
    const [showPassword, setShowPassword] = useState(false);
    const [signupError, setSingupError] = useState('');
    const navigate = useNavigate();

    const HandlePhoneFocusIn = () => {
        phoneLabel.current.style.top = '-18px';
        phoneLabel.current.style.left = '0px';
    }
    const HandlePhoneFocusOut = (e) => {
        if (e.target.value.length === 0) {
            phoneLabel.current.style.top = '12px';
            phoneLabel.current.style.left = '50px';
        }
    }
    const HandleUserSignUp = async (e) => {
        e.preventDefault();
        const user = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            password: e.target.password.value
        }
        const res = await fetch('http://localhost:8080/user/sign-up', {
            method: 'POST',
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await res.json();
        if(res.ok){
            console.log('Signup success', data);
            dispatch({type:'LOGIN', payload:data.user});
            navigate('/');
        }
        if(data.error !== null){
            setSingupError(data.error);
            console.log("Error recieved");
            return;
        }
        console.log(user);
    }
    return (
        <div className='login-form-container'>
            <h1>SIGN UP</h1>
            <form onSubmit={HandleUserSignUp} action="http://localhost:8080/user/sign-up" method='POST'>
                <div className='form-input'>
                    <input type="text" id="name" name='name' required placeholder="Enter Your Name" />
                    <label htmlFor="name">Name</label>
                </div>
                <div className='form-input'>
                    <input type='email' id="email" name='email' required placeholder="Enter Your Email-ID" />
                    <label htmlFor="email">Email</label>
                </div>
                <div className='form-input'>
                    <PhoneInput
                        country={''}
                        placeholder={"Enter Your Contact No"}
                        inputProps={{ name: 'phone', id: "phone-input", required: true }}
                        onFocus={HandlePhoneFocusIn} onBlur={HandlePhoneFocusOut}
                    />
                    <label ref={phoneLabel} htmlFor="phone-input" id='phone-label'>Contact No</label>
                </div>
                <div className='form-input password'>
                    <input type={!showPassword ? 'password' : 'text'} name="password" id="password" required placeholder='Enter Your Password' />
                    <label htmlFor="password">Password</label>
                    <span onClick={() => setShowPassword(!showPassword)}>{showPassword
                        ? <FontAwesomeIcon icon={faEye} /> :
                        <FontAwesomeIcon icon={faEyeSlash} />}</span>
                </div>
                <button type='submit' className='login-btn'>Sign Up</button>
            </form>
            <p>
                Already registered ? <Link to="/login">Log-In</Link>
            </p>
        </div>
    )
}
