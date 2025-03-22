import React, { useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookings } from '../redux/actions/bookingActions';
import { Row, Col, Spin } from 'antd';
import moment from 'moment';

function UserBooking() {
  const dispatch = useDispatch();
  const { bookings} = useSelector((state) => state.bookingsReducer);
const {loading}=useSelector((state)=>state.alertsReducer);

  const user=JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);
  
  console.log("Bookings Data:", bookings); // Debugging
  

  return (
    <DefaultLayout>
     <h3 className="text-center mt-2">My Bookings</h3>


      {/* ✅ Show loading spinner when data is fetching */}
      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : bookings.length === 0 ? (
        // ✅ Show message if there are no bookings
        <p className="text-center mt-4">You have no bookings yet. Start booking now! 🚗</p>
      ) : (
        <Row justify="center" gutter={16}>
          <Col lg={20} sm={24}>
            {bookings.filter(o=>o.user===user._id).map((booking) => (
              <Row justify='center' gutter={16} className="bs1 m-3 text-left">
                <Col lg={6} sm={24}>
                  <p><b>{booking.car.name}</b></p>
                  
                  <p>Rent per Hour: <b>₹{booking.car.rentPerHour}</b></p>
                  <p>Total Amount: <b>₹{booking.totalAmount}</b></p>
                </Col>
                <Col lg={12} sm={24}>
                  <p>Transaction Id:<b>{booking.transactionId}</b></p>
                  <p>From:<b>{booking.bookedTimeSlots.from}</b></p>
                  <p>To:<b>{booking.bookedTimeSlots.to}</b></p>
                  <p>Date of Booking:<b>{moment(booking.createdAt).format('MMM DD YYYY')}</b></p>
                </Col>
                <Col lg={6} sm={24} className='text-right'>
                 <img style={{borderRadius:3}}src={booking.car.image} height='150' className='p-2'/>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
      )}
    </DefaultLayout>
  );
}
 
export default UserBooking;
