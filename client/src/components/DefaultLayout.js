import React from "react";
import { Button, Dropdown, Row, Col } from "antd"; // Removed unused Menu import
import {Link} from 'react-router-dom';
function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("user")) || { username: "Guest" };

  const items = [
    {
      key: "1",
      label: <a href="/">Home</a>,
    },
    {
      key: "2",
      label: <a href="/userbookings">Booking</a>,
    },
    {
      key: "3",
      label: <a href="/admin">Admin</a>,
    },
    {
      key: "4",
      label: (
        <button
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            padding: 0,
            color: "blue",
            textDecoration: "underline",
          }}
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      ),
    },
  ];

  return (
    <div>
      {/* Header Section */}
      <div className="header bs1">
        <Row gutter={16} justify="center">
          <Col lg={20} sm={24} xs={24}></Col>
        </Row>
        <div className="d-flex justify-content-between align-items-center">
          <h1><b><Link to='/' style={{color:'orangered'}}>Patel's Cars</Link></b></h1>

          {/* Dropdown Menu */}
          <Dropdown menu={{ items }} placement="bottom">
            <Button>{user?.username || "Guest"}</Button>
          </Dropdown>
        </div>
      </div>

      {/* Content Section */}
      <div className="content">{props.children}</div>
      <div className="footer text-center">
        <hr/>
        <p>Designed and Developed By Patel's Car</p>

      </div>
    </div>
  );
}

export default DefaultLayout;
