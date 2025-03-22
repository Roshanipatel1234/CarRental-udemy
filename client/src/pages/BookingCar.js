import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Row, Col, Divider, DatePicker, Checkbox } from 'antd';
import DefaultLayout from '../components/DefaultLayout';
import { getAllCars } from '../redux/actions/carsAction';
import Spinner from '../components/Spinner';
import moment from 'moment';
import { bookCar } from '../redux/actions/bookingActions';
import { Modal } from 'antd';
import StripeCheckout from 'react-stripe-checkout';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
const { RangePicker } = DatePicker;

function BookingCar() {
  const dispatch = useDispatch();
  const { carid } = useParams();
  const { cars, loading } = useSelector((state) => state.carsReducer);
  const [car, setCar] = useState(null);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [totalHours, setTotalHours] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [driver, setDriver] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    if (cars.length > 0) {
      setCar(cars.find((o) => o._id === carid));
    }
  }, [cars, carid]);

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Fix: Initialize AOS inside useEffect
  }, []);

  function selectTimeSlots(values) {
    if (values && values.length === 2) {
      const start = moment(values[0].toISOString());
      const end = moment(values[1].toISOString());

      setFrom(start.format('MMM DD YYYY HH:mm'));
      setTo(end.format('MMM DD YYYY HH:mm'));

      const duration = end.diff(start, 'hours', true);
      const hours = duration.toFixed(2);
      setTotalHours(hours);

      if (car) {
        setTotalAmount(hours * car.rentPerHour + (driver ? hours * 30 : 0));
      }
    }
  }

  useEffect(() => {
    if (car && totalHours > 0) {
      setTotalAmount(totalHours * car.rentPerHour + (driver ? totalHours * 30 : 0));
    }
  }, [driver, totalHours, car]);

  function onToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem('user'))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(bookCar(reqObj));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      {car ? (
        <Row justify="center" align="middle" style={{ minHeight: '90vh', backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
          <Col lg={10} sm={24} xs={24} className='p-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={car.image} className="carimg2 bs1 w-100" data-aos="flip-left" data-aos-duration='1500' alt={car.name} style={{ width: '100%', borderRadius: '10px' }} />
          </Col>

          <Col lg={10} sm={24} xs={24} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)', marginLeft: '15px' }}>
            <Divider type="horizontal" dashed>
              <h3 style={{ color: '#333', fontWeight: 'bold' }}>Car Info</h3>
            </Divider>
            <div style={{ textAlign: 'right', fontSize: '16px' }}>
              <p><strong>{car.name}</strong></p>
              <p><b>{car.rentPerHour} ₹</b> Rent Per Hour</p>
              <p>Fuel: {car.fuelType}</p>
              <p>Max Persons: {car.capacity}</p>
            </div>

            <Divider type="horizontal" dashed>
              <h3 style={{ color: '#333', fontWeight: 'bold' }}>Select Your Time Slots</h3>
            </Divider>
            <RangePicker showTime={{ format: 'HH:mm' }} format="MMM DD YYYY HH:mm" onChange={selectTimeSlots} style={{ width: '100%', padding: '10px' }} />
            <br/>
            <button className='btn1 mt-2' onClick={() => setShowModal(true)}>See Booked Slots</button>
            {from && to && totalHours > 0 && (
              <div style={{ marginTop: '20px', textAlign: 'left' }}>
                <p style={{ fontSize: '18px' }}>Total Hours: <b>{totalHours}</b></p>
                <p style={{ fontSize: '18px' }}>Total Rent: <b>{totalHours * car.rentPerHour} ₹</b></p>
                <Checkbox onChange={(e) => setDriver(e.target.checked)} style={{ fontSize: '16px', marginBottom: '10px' }}>
                  Driver Required (+30₹ per hour)
                </Checkbox>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <h2 style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', borderRadius: '5px', textAlign: 'center', marginBottom: '15px' }}>
                    Total Amount: {totalAmount} ₹
                  </h2>
                  <StripeCheckout  shippingAddress token={onToken} stripeKey="pk_test_51QxVJGEEoAGOCxksLkEBcdDVPUzUy3LYmNaT0f8afEqFu9emRVAjIr4ugfbuzuraikzJbpDBDKXpS1Y8D8GrRhqs00uG0KmO6L" amount={totalAmount * 100} currency="INR" name="Car Rental" description={`Booking for ${car?.name}`}>
                    <button className="btn1" style={{ backgroundColor: '#ff5722', color: 'white', border: 'none', padding: '12px 30px', fontSize: '18px', borderRadius: '5px', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>Pay & Book Now</button>
                  </StripeCheckout>
                </div>
              </div>
            )}
          </Col>
        </Row>
      ) : (!loading && <h2 className="text-center">Car not found</h2>)}

<Modal open={showModal} onCancel={() => setShowModal(false)} footer={null} title="Booked Time Slots">
  {car ? ( // Check if car is not null
    <div className='p-2'>
      {car.bookedTimeSlots?.map((slot, index) => (
        <button key={index} className='btn1 mt-2'>
          {slot.from} - {slot.to}
        </button>
      ))}
      <div className='text-right'>
        <button className='btn1' onClick={() => setShowModal(false)}>Close</button>
      </div>
    </div>
  ) : (
    <p>No car data available.</p> // Handle the case when car is null
  )}
</Modal>


    </DefaultLayout>
  );
}

export default BookingCar;
