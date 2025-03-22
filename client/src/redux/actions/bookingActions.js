import { message } from 'antd';
import axios from 'axios';

// Book Car Action
export const bookCar = (reqObj) => async (dispatch, getState) => {
  if (getState().loading) return; // Prevent duplicate requests

  dispatch({ type: 'BOOK_CAR_REQUEST' });

  try {
    const { data } = await axios.post('/api/bookings/bookcar', reqObj);

    dispatch({ type: 'BOOK_CAR_SUCCESS', payload: data });

   setTimeout(()=>{
    message.success('🚗 Your car has been booked successfully! ✅');
   },500);
   window.location.href='/userbookings'

  } catch (error) {
    dispatch({
      type: 'BOOK_CAR_FAILURE',
      payload: error.response?.data?.message || 'Booking failed!',
    });

    message.error(`❌ ${error.response?.data?.message || 'Failed to book the car. Please try again.'}`);
  }
};

// Get All Bookings Action
export const getAllBookings = () => async (dispatch) => {
  dispatch({ type: 'GET_BOOKINGS_REQUEST' });

  try {
    const { data } = await axios.get('/api/bookings/getallbookings');
    dispatch({ type: 'GET_BOOKINGS_SUCCESS', payload: data });

  } catch (error) {
    dispatch({
      type: 'GET_BOOKINGS_FAILED',
      payload: error.response?.data?.message || 'Error fetching bookings!',
    });

    message.error(`❌ ${error.response?.data?.message || 'Failed to fetch bookings.'}`);
  }
};
