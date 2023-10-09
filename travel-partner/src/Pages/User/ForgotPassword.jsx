import { Link } from "react-router-dom";

export const ForgotPassword = () => {
    return (
        <div className='login-form-container'>
            <h1>FORGOT PASSWORD</h1>
            <form action="">
                <div className='form-input'>
                    <input type="email" id="email" placeholder="Enter Your Email" />
                    <label htmlFor="email">Email ID</label>
                </div>
                <button type="submit" className='login-btn'>Forgot Password</button>
            </form>
            <p>
                Remember your credentials ? <Link to="/login">Log-In</Link>
            </p>
            <p>
                Not an existing user ? <Link to="/signup">Sign-Up</Link>
            </p>
        </div>
    )
}
