import {Link} from 'react-router-dom';
import './StyleSheet/signup.css';

export const Login = () => {
    return (
        <div className='login-form-container'>
            <form action="" method='POST'>
                <div className='form-input'>
                    <input type='email' id="email" name='email' placeholder="Enter Your Email-ID" />
                    <label htmlFor="email">Email</label>
                </div>
                <div className='form-input'>
                    <input type="password" name="password" id="password" placeholder='Enter Your Password' />
                    <label htmlFor="password">Password</label>
                </div>
                <button type='submit' className='login-btn'>Log In</button>
            </form>
            <p>
                Not an existing user ? <Link to="/signup">Sign-Up</Link>
            </p>
        </div>
    )
}
