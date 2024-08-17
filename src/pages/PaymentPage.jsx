import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import paymentService from '../services/paymentService';
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cardNo, setCardNo] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);

  // Retrieve the booking ID and amount from local storage
  const bookingId = localStorage.getItem('bookingId');
  const amount = parseFloat(localStorage.getItem('totalAmmount'));

  useEffect(() => {
    if (!amount) {
      toast.error('Payment amount not found. Please try again.');
    }
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!bookingId) {
      toast.error('Booking ID not found. Please try again.');
      return;
    }

    const paymentDto = {
      amount,
      cardNo,
      cardHolderName,
      expiryDate,
      cvv,
    };

    setLoading(true);

    try {
      const response = await paymentService.updateBooking(`http://localhost:8080/booking/confirm_booking/${bookingId}`, paymentDto);

      if (response && response.data) {
        // On successful payment, navigate to the payment success page
        navigate('/payment-success', { state: { paymentResponse: response.data } });
      } else {
        toast.error('Payment failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred during payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <h2>Payment Details</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="cardNo" className="form-label">Card Number</label>
          <input
            type="text"
            id="cardNo"
            className="form-control"
            value={cardNo}
            onChange={(e) => setCardNo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cardHolderName" className="form-label">Card Holder Name</label>
          <input
            type="text"
            id="cardHolderName"
            className="form-control"
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="expiryDate" className="form-label">Expiry Date (MM/YY)</label>
          <input
            type="text"
            id="expiryDate"
            className="form-control"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
            pattern="\d{2}/\d{2}" // Ensures the expiry date is in MM/YY format
            placeholder="MM/YY"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cvv" className="form-label">CVV</label>
          <input
            type="text"
            id="cvv"
            className="form-control"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
            maxLength={3} // Ensures CVV is only 3 digits
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Processing...' : 'Submit Payment'}
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;