import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCars } from '../redux/actions/carsAction';
import { Row, Col, DatePicker } from 'antd'; 
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import moment from 'moment';

const { RangePicker } = DatePicker; 

function Home() {
  const { cars } = useSelector(state => state.carsReducer);
  const { loading } = useSelector(state => state.alertsReducer);
  const [totalCars, setTotalCars] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]);

  function setFilter(values) {
    if (!values || values.length !== 2) return;

    let selectedFrom = moment(values[0], 'MMM DD YYYY HH:mm');
    let selectedTo = moment(values[1], 'MMM DD YYYY HH:mm');

    let filteredCars = cars.filter(car => {
      if (!car.bookedTimeSlots || car.bookedTimeSlots.length === 0) {
        return true; // ✅ If no bookings, car is available
      }

      // ✅ Check if the selected range overlaps with any booked slot
      let isAvailable = car.bookedTimeSlots.every(booking => {
        let bookingFrom = moment(booking.From, 'MMM DD YYYY HH:mm');
        let bookingTo = moment(booking.to, 'MMM DD YYYY HH:mm');

        return (
          selectedTo.isBefore(bookingFrom) ||  // ✅ Selected range ends before booking starts
          selectedFrom.isAfter(bookingTo)      // ✅ Selected range starts after booking ends
        );
      });

      return isAvailable;
    });

    setTotalCars(filteredCars);
  }

  return (
    <DefaultLayout>
      <Row className='mt-3' justify='center'>
        <Col lg={20} sm={24} className='d-flex justify-content-left'>
          <RangePicker  
            showTime={{ format: 'HH:mm' }} 
            format="MMM DD YYYY HH:mm" 
            onChange={setFilter} 
           
          />
        </Col>
      </Row>

      {loading && <Spinner />}

      <Row justify='center' gutter={16} className='mt-5'>
        {totalCars.map(car => (
          <Col lg={5} sm={24} xs={24} key={car._id}>
            <div className='car p-2 bs1'>
              <img src={car.image} className="carimg"/>
              <div className='car-content d-flex align-items-center justify-content-between'>
                <div className='text-left pl-2'>
                  <p>{car.name}</p>
                  <p>{car.rentPerHour} Rent Per Hour</p>
                </div>
                <div>
                 
                <button className="btn1 mr-2"> <Link to={`/booking/${car._id}`}>Book Now</Link></button>
                  
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </DefaultLayout>
  );
}

export default Home;
