import React from 'react';
import { Row, Col, Form, Input } from 'antd';
import {Link} from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';
import { userLogin } from '../redux/actions/userActions';
import Spinner from '../components/Spinner';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

function Login() {
  const dispatch=useDispatch()
  const {loading}=useSelector(state=>state.alertsReducer)
  function onFinish(values){
    dispatch(userLogin(values))
    console.log(values)
  
  }
  return (
    <div className="login">
      {loading && (<Spinner/>)}
      <Row gutter={16} className='d-flex align-items-center'>
        {/* Image Column */}
        <Col lg={16} className="image-container">
          <img 
           data-aos='slide-right'
           data-aos-duration='1500'
            src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Car" 
            className="login-image"
          />
          <h1 className='login-logo'>PATEL'S CARS</h1>
        </Col>

        {/* Login Form Column */}
        <Col lg={8} className="text-left p-5">
          <Form layout="vertical" className="login-form p-5" onFinish={onFinish}>
            <h1>Login</h1>
            <hr />
            <Form.Item name="username" label="Username" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
              <Input/>
            </Form.Item>
            <Form.Item>
              <button className="btn1 mt-2">Login</button>
              <hr/>
              <Link to='/register'>Click Here To Register</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
