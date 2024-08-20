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
  const [userRole, setUserRole] = useState(''); // Default role
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSignup = async (e) => {
    e.preventDefault();

    // first name validatain 
    if (firstName == '') {
      toast.error("please enter first name");
      return;
    }

    // first name validatain 
    if (lastName == '') {
      toast.error("please enter last name");
      return;
    }

    // Mobile number validation
    const mobilePattern = /^[6789]\d{9}$/; // Must start with 6, 7, 8, or 9 and be 10 digits
    if (!mobilePattern.test(mobile)) {
      toast.error("Mobile number must start with 6, 7, 8, or 9 and be 10 digits long!"); // Show toast notification for invalid mobile
      return;
    }

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

    // // Password  validation
    // const passwordPattern = /(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[^\w\s]).{8,20}/;
    // // (?=.*\d) ensures at least one digit.
    // // (?=.*[a-z]) ensures at least one lowercase letter.
    // // (?=.*[A-Z]) ensures at least one uppercase letter.
    // // (?=.*[^\w\s]) ensures at least one special character. This part includes any character that is not a word character (\w matches letters and digits) or whitespace (\s matches spaces, tabs, etc.).
    // // .{5,20} ensures the password length is between 5 and 20 characters.
    // // With this regex, any special character (like !, @, #, $, %, etc.) will be acceptable.
    // if (!passwordPattern.test(password)) {
    //   toast.error("Blank or Invalid password format , "
    //     + "it must contain at least one digit, at least one lower case letter, at least one upper case "
    //     + "at least one specilal char and should be 8 to 20 char long!!!!"); // Show toast notification for short password
    //   return;
    // }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!"); // Show toast notification for password mismatch
      return;
    }

    if (!(userRole === 'ROLE_ADMIN' || userRole === "ROLE_HOST" || userRole === "ROLE_GUEST")) {
      toast.error("please select a role");
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

    <>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className=" col-md-4 mb-3">
            <h4 className='text-align-center'>SignUp</h4>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className=" col-md-4 mb-3">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className="col-md-4 mb-3">
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className=" col-md-4 mb-3">
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className="col-md-4 mb-3">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className='row justify-content-center'>
          <div className=" col-md-4 mb-3">
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className='row justify-content-center'>
          <div className="col-md-4 mb-3">
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              onChange={(e) => setUserRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="ROLE_GUEST">Guest</option>
              <option value="ROLE_HOST">Host</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>

          </div>
        </div>

        <div className='row justify-content-center'>
          <div className='col-md-1'>
            <button type="button" className="btn btn-primary" onClick={handleSignup}>
              Submit
            </button>

          </div>

          <div className='col-md-1'>
            <button

              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => navigate('/')} // Navigate to home page 
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>

  );
};

export default SignupPage;