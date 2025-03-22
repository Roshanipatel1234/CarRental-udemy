import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCars, deleteCar } from '../redux/actions/carsAction'; // Import deleteCar action
import { Row, Col } from 'antd'; 
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, message } from 'antd';

function AdminHome() {
  const { cars } = useSelector(state => state.carsReducer);
  const { loading } = useSelector(state => state.alertsReducer);
  const [totalCars, setTotalCars] = useState([]);
  const dispatch = useDispatch();

  // Fetch cars from the backend
  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]);

  // Handle car deletion
  const handleDelete = (carId) => {
    dispatch(deleteCar(carId));
    message.success("Car deleted successfully!");
  };

  return (
    <DefaultLayout>
      <Row justify='center' gutter={16} className='mt-2'>
        <Col lg={20} sm={24}> 
          <Link to="/addcar">
          <div className='text-right'>
            <button className='btn1'>Add Car</button>
            </div>
          </Link>
        </Col>
      </Row>

      {loading && <Spinner />}
<h1>Admin Page</h1>
      <Row justify='center' gutter={16} className='mt-5'>
        {totalCars.map(car => (
          <Col lg={5} sm={24} xs={24} key={car._id}>
            <div className='car p-2 bs1'>
              <img src={car.image} className="carimg" alt={car.name} />
              <div className='car-content d-flex align-items-center justify-content-between'>
                <div>
                  <p>{car.name}</p>
                  <p>{car.rentPerHour} Rent Per Hour</p>
                </div>
                <div className='mr-4'>
                  {/* Edit Car */}
                  <Link to={`/editcar/${car._id}`}>
                    <EditOutlined className='mr-3' style={{ color: 'green', cursor: 'pointer' }} />
                  </Link>

                  {/* Delete Car with Confirmation */}
                  <Popconfirm 
                    title="Are you sure you want to delete this car?"
                    onConfirm={() => handleDelete(car._id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
                  </Popconfirm>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </DefaultLayout>
  );
}

export default AdminHome;
