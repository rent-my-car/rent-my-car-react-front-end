import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Ensure you have react-router-dom installed
import { useAuth } from '../../context/AuthContext'; // Adjust the path as necessary

const NavBar = () => {
  const { user, logout } = useAuth(); // Get user details and logout function from context
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogout = () => {
    logout(); // Call logout function
    navigate('/'); // Redirect to home page
  };
  console.log(user);

  // console.log(user.role);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">RentMyRide</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          {user.role === 'ROLE_ADMIN' && (
            <>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/admin-dashboard">Admin Dashboard</Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/manage-guest">Manage Guest</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/manage-host">Manage Host</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/manage-approval">Manage Approvals</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/view-bookings">View Bookings</Link>
            </li> */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                More
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/about">About Us</Link>
                <Link className="dropdown-item" to="/help-support">Help & Support</Link>
                <Link className="dropdown-item" to="/contact">Contact Us</Link>
              </div>
            </li>
          </>
          )}
          {user.role === 'ROLE_HOST' && (
            <>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  My Cars
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/confirmed-car-approvals">Confirmed Cars</Link>
                  <Link className="dropdown-item" to="/pending-car-approvals">Pending Cars</Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Bookings
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/upcoming-booking">Upcoming Booking</Link>
                  <Link className="dropdown-item" to="/past-booking">Past Booking</Link>
                </div>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-car">Add Car</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/car-list">Car List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/car-update">Update Car</Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  More
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/about">About Us</Link>
                  <Link className="dropdown-item" to="/help-support">Help & Support</Link>
                  <Link className="dropdown-item" to="/contact">Contact Us</Link>
                </div>
              </li>
            </>
          )}
          {user.role === 'ROLE_GUEST' && (
           <>
           {/* <li className="nav-item">
             <Link className="nav-link" to="/guest-home">Home</Link>
           </li> */}
           <li className="nav-item">
             <Link className="nav-link" to="/book-car">Book Car</Link>
           </li>
           <li className="nav-item dropdown">
             <Link
               className="nav-link dropdown-toggle"
               to="#"
               id="navbarDropdown"
               role="button"
               data-bs-toggle="dropdown"
               aria-haspopup="true"
               aria-expanded="false"
             >
               Bookings
             </Link>
             <div className="dropdown-menu" aria-labelledby="navbarDropdown">
               <Link className="dropdown-item" to="/upcoming-booking">Upcoming Booking</Link>
               <Link className="dropdown-item" to="/past-booking">Past Booking</Link>
             </div>
           </li>
         </>
          )}

        </ul>
        <div className="ms-auto"> {/* Align links to the right */}
          {user.id ? ( // Check if user is logged in
            <>
              <span className="navbar-text me-3">Welcome, {user.email}</span> {/* Display user name/email */}
              <Link to="/" className="btn btn-danger " onClick={handleLogout}>Logout</Link>
            </>
          ) : (
            <>
              <Link to="/signup" className="btn btn-primary me-2">Become Host</Link>
              <Link to="/login" className="btn btn-primary me-2">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;