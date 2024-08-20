import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import userService from '../services/userService';
import { jwtDecode } from 'jwt-decode';

const LoginPage = () => {
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { redirectPath } = location.state || { redirectPath: '/' }; // Default to home if no redirectPath is provided
    const { state } = location;
    const searchParams = state?.searchParams || {};

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userRole, setUserRole] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleCancel = () => {
        navigate("/");
    }





    const handleLogin = async (e) => {
        e.preventDefault();


        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // The regex /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ensures that:
        // The email starts with a sequence of characters that do not include whitespace or @.
        // There is exactly one @ symbol.
        // The domain part follows, with no whitespace or @, and it contains at least one dot (.).
        // The TLD (after the dot) consists of characters without whitespace or @.

        if (!emailPattern.test(email)) {
            toast.error("Please enter a valid email address!"); // Show toast notification for invalid email
            return;
        }

        // Password  validation
        // const passwordPattern = /(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[^\w\s]).{8,20}/;
        // // (?=.*\d) ensures at least one digit.
        // // (?=.*[a-z]) ensures at least one lowercase letter.
        // // (?=.*[A-Z]) ensures at least one uppercase letter.
        // // (?=.*[^\w\s]) ensures at least one special character. This part includes any character that is not a word character (\w matches letters and digits) or whitespace (\s matches spaces, tabs, etc.).
        // // .{5,20} ensures the password length is between 5 and 20 characters.
        // // With this regex, any special character (like !, @, #, $, %, etc.) will be acceptable.
        // if (!passwordPattern.test(password)) {
        //     toast.error("Blank or Invalid password format , "
        //         + "it must contain at least one digit, at least one lower case letter, at least one upper case "
        //         + "at least one specilal char and should be 8 to 20 char long!!!!"); // Show toast notification for short password
        //     return;
        // }

        if (!(userRole === 'ROLE_ADMIN' || userRole === "ROLE_HOST" || userRole === "ROLE_GUEST")) {
            toast.error("please select a role");
            return;
        }


        const lowerCaseEmail = email.toLowerCase();

        try {
            const LOGIN_API_URL = 'http://localhost:8080/user/login';
            const data = await userService.loginUser(LOGIN_API_URL, lowerCaseEmail, password, userRole);
            const tokenData = jwtDecode(data.jwt);
            // {
            //     "sub": "user.asheesh01@gmail.com",
            //     "iat": 1724062036,
            //     "exp": 1724148436,
            //     "user_id": 1,
            //     "authorities": "ROLE_GUEST"
            // }
            login(tokenData.user_id, tokenData.sub, tokenData.authorities, data.jwt);

            // Redirect to the booking page after successful login
            const carId = localStorage.getItem('carId');
            if (carId) {
                navigate(redirectPath); // Redirect to the appropriate page after login
            } else {
                navigate('/'); // Redirect to home if no booking details
            }

            toast.success(`Welcome back, ${user.email}!`);
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <>

            <div className="container">
                <div className='row justify-content-center'>
                    <div className=" col-md-4 mb-3">
                        <h4 className='text-align-center'>Login</h4>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-4 mb-3">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                </div>


                <div className="row justify-content-center">
                    <div className="col-md-4 mb-3">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="form-check col-md-4 mb-3 ">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" onChange={() => setShowPassword(!showPassword)} value="" id="show-password" />
                            <label className="form-check-label" htmlFor="show pasword">
                                Show Password
                            </label>
                        </div>
                    </div>
                </div>



                <div className="row justify-content-center">
                    <div className="col-md-4 mb-3">
                        <select
                            className="form-select"
                            value={userRole}
                            placeholder=""
                            onChange={(e) => setUserRole(e.target.value)}
                        >
                            <option value="">Select Role</option>
                            <option value="ROLE_GUEST">Guest</option>
                            <option value="ROLE_HOST">Host</option>
                            <option value="ROLE_ADMIN">Admin</option>
                        </select>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className='col-md-1 '>
                        <button onClick={handleLogin} className="btn btn-primary">Login</button>
                    </div>
                    <div className="col-md-1">
                        <button onClick={handleCancel} className="btn btn-primary">Cancel</button>
                    </div>
                </div>
            </div >
        </>
    );
};

export default LoginPage;