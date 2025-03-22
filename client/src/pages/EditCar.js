import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import { Row, Col, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { editCar, getAllCars } from "../redux/actions/carsAction";
import Spinner from "../components/Spinner";

function EditCar() {
    const { carid } = useParams();
    const dispatch = useDispatch();
    const { cars } = useSelector((state) => state.carsReducer);
    const { loading } = useSelector((state) => state.alertsReducer);
    const [car, setCar] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(getAllCars());
    }, [dispatch]);

    useEffect(() => {
        if (cars.length > 0) {
            const foundCar = cars.find((o) => o._id === carid);
            setCar(foundCar);
            if (foundCar) {
                form.setFieldsValue(foundCar);
            }
        }
    }, [cars, carid, form]);

    function onFinish(values) {
        values._id = carid; // Ensure ID is sent
        values.bookedTimeSlots = car.bookedTimeSlots || [];
        dispatch(editCar(values));
        console.log("Updated Car:", values);
    }

    return (
        <DefaultLayout>
            {loading && <Spinner />}
            <Row justify="center" className="mt-5">
                <Col lg={12} sm={24}>
                    {car && (
                        <Form
                            form={form}
                            className="bs1 p-2"
                            layout="vertical"
                            onFinish={onFinish}
                            initialValues={car} // Populate form fields
                        >
                            <h3>Edit Car</h3>
                            <hr />
                            <Form.Item name="name" label="Car Name" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="image" label="Image URL" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="rentPerHour" label="Rent Per Hour" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="capacity" label="Capacity" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="fuelType" label="Fuel Type" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <div className="text-right">
                                <button className="btn1" type="submit">Update Car</button>
                            </div>
                        </Form>
                    )}
                </Col>
            </Row>
        </DefaultLayout>
    );
}

export default EditCar;
