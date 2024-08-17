import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom'; // Ensure you have react-router-dom installed
import { toast } from 'react-toastify'; // Import toast for notifications
import userService from '../services/userService'; // Adjust the path as necessary

const SignupPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userRole, setUserRole] = useState('GUEST'); // Default role
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSignup = async (e) => {
    e.preventDefault();

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address!"); // Show toast notification for invalid email
      return;
    }

    // Mobile number validation
    const mobilePattern = /^[6789]\d{9}$/; // Must start with 6, 7, 8, or 9 and be 10 digits
    if (!mobilePattern.test(mobile)) {
      toast.error("Mobile number must start with 6, 7, 8, or 9 and be 10 digits long!"); // Show toast notification for invalid mobile
      return;
    }

    // Password length validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!"); // Show toast notification for short password
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!"); // Show toast notification for password mismatch
      return;
    }

    // Prepare user data for registration
    const userData = {
      firstName,
      lastName,
      mobile,
      email,
      password,
      confirmPassword,
      roleEnum: userRole,
    };

    try {
      await userService.registerUser(userData); // Call the registration service
      toast.success("Registration successful! Please log in."); // Show success message
      navigate('/login'); // Redirect to login page
    } catch (err) {
      toast.error(err.message); // Show error message from the service
    }
  };

  return (
    <div className="container text-center my-4">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup} className="my-4">
        <div className="mb-3">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="form-control"
            required
          />
        </div>
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
            type={showPassword ? "text" : "password"} // Toggle between text and password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type={showPassword ? "text" : "password"} // Toggle between text and password
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)} // Toggle password visibility
          />
          <label className="form-check-label" htmlFor="showPassword">Show Password</label>
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
        <button type="submit" className="btn btn-primary" onClick={handleSignup}>
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate('/')} // Navigate to home page
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default SignupPage;