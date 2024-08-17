import axios from 'axios';
import { toast } from 'react-toastify';

const updateBooking = async (url, paymentDto) => {
  try {
    const response = await axios.patch(url, paymentDto);
    toast.success('Payment processed successfully!');
    return { data: response.data, error: null };
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message || 'Payment failed. Please try again.';
      toast.error(errorMessage);
      return { data: null, error: errorMessage };
    }
    toast.error('An unexpected error occurred. Please try again.');
    return { data: null, error: 'Network error' };
  }
};

export default {
  updateBooking,
};