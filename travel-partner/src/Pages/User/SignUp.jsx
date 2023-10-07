import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {Link} from 'react-router-dom';
import './StyleSheet/signup.css';
import { useRef, useState } from 'react';


export const SignUp = () => {

    const phoneLabel = useRef();

    const HandlePhoneFocusIn = ()=>{
        phoneLabel.current.style.top = '-18px';
        phoneLabel.current.style.left = '0px';
    }
    const HandlePhoneFocusOut = (e)=>{
        if(e.target.value.length === 0){
            phoneLabel.current.style.top = '12px';
            phoneLabel.current.style.left = '50px';
        }
    }
    return (
        <div className='login-form-container'>
            <form action="" method='POST'>
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
                <div className='form-input'>
                    <input type="password" name="password" id="password" required placeholder='Enter Your Password' />
                    <label htmlFor="password">Password</label>
                </div>
                <button type='submit' className='login-btn'>Sign Up</button>
            </form>
            <p>
                Already registered ? <Link to="/login">Log-In</Link>
            </p>
            
        </div>
    )
}
