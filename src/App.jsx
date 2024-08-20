import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext'; // Adjust the path as necessary
import Layout from './components/layout/Layout'; // Adjust the path as necessary
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import AddCar from './pages/AddCar';
import CarListingPage from './pages/CarListingPage';
import Profile from './pages/Profile';
import BookingPage from './pages/BookingPage';
import SignupPage from './pages/SignUp';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import ManageGuests from './pages/ManageGuest';
import ManageHosts from './pages/ManageHost';
import PendingApprovalPage from './pages/PendingApprovalPage';
import Test from './pages/Test';
import Booking from './pages/Booking';

// import LoginPage from './components/LoginPage'; // Adjust the path as necessary

const App = () => {
  return (


    <AuthProvider>
      <Router>
        <Layout>
          <ToastContainer /> {/* Add ToastContainer here */}
          <Routes>
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/host-home" element={<Profile />} />
            <Route path="/book-car" element={<HomePage />} />
            <Route path="/add-car" element={<AddCar />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/upcoming-booking" element={<Booking bookingType={'upcoming-booking'}/>} />
            <Route path="/past-booking" element={<Booking bookingType={'past-booking'} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/confirmed-car-approvals" element={<CarListingPage listingType="confirmed" />} />
            <Route path="/pending-car-approvals" element={<CarListingPage listingType="pending" />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/manage-guest" element={<ManageGuests />} />
            <Route path="/manage-host" element={<ManageHosts />} />
            <Route path="/manage-approval" element={<PendingApprovalPage />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );

};

export default App;