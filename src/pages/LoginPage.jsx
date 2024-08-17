import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate, useLocation } from 'react-router-dom'; 
import { toast } from 'react-toastify'; 
import userService from '../services/userService'; 

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { redirectPath } = location.state || { redirectPath: '/' }; // Default to home if no redirectPath is provided
    const { state } = location;
    const searchParams = state?.searchParams || {};

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userRole, setUserRole] = useState('GUEST'); 
    const [showPassword, setShowPassword] = useState(false); 

    const handleLogin = async (e) => {
        e.preventDefault();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            toast.error("Please enter a valid email address!");
            return;
        }

        const lowerCaseEmail = email.toLowerCase();

        try {
            const LOGIN_API_URL = 'http://localhost:8080/user/login'; 
            const userData = await userService.loginUser(LOGIN_API_URL, lowerCaseEmail, password, userRole); 
            login(userData.id, userData.email.toLowerCase(), userData.roleEnum); 

            // Redirect to the booking page after successful login
            const carId = localStorage.getItem('carId');
            if (carId) {
                navigate(redirectPath); // Redirect to the appropriate page after login
            } else {
                navigate('/'); // Redirect to home if no booking details
            }

            toast.success(`Welcome back, ${userData.email}!`);
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="container text-center my-4">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="my-4">
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        required
                    />
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="showPassword"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        <label className="form-check-label" htmlFor="showPassword">Show Password</label>
                    </div>
                </div>
                <div className="mb-3">
                    <select
                        className="form-select"
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value)}
                    >
                        <option value="GUEST">Guest</option>
                        <option value="HOST">Host</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;