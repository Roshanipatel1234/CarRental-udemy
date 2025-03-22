import { message } from 'antd';
import axios from 'axios';

export const getAllCars = () => async (dispatch) => {
  dispatch({ type: 'GET_CARS_REQUEST' });

  try {
    const response = await axios.get('/api/cars'); // Ensure your API is correct
    dispatch({ type: 'GET_CARS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'GET_CARS_FAILED', payload: error.message });
  }
};

export const addCar = (carData) => async (dispatch) => {
  dispatch({ type: "SHOW_LOADING" });

  try {
      console.log("🚀 Sending Data to API:", carData); // Debugging

      const response = await axios.post("http://localhost:5000/api/cars", carData, {
          headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Car Added:", response.data); // Debugging

      dispatch({ type: "HIDE_LOADING" });
      dispatch({ type: "ADD_CAR_SUCCESS", payload: response.data });
  } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.error("❌ Error Adding Car:", error.response?.data || error.message);
  }
};

export const editCar = (carData) => async (dispatch) => {
  dispatch({ type: "SHOW_LOADING" });

  try {
      console.log("🚀 Sending Update Request:", carData);

      const response = await axios.put(`http://localhost:5000/api/cars/${carData._id}`, carData, {
          headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Car Updated:", response.data);

      dispatch({ type: "HIDE_LOADING" });
      dispatch({ type: "EDIT_CAR_SUCCESS", payload: response.data });

      message.success("Car updated successfully!"); // Show success message
  } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.error("❌ Error Editing Car:", error.response?.data || error.message);
      message.error("Failed to edit car. Please try again.");
  }
};

export const deleteCar = (carId) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.delete(`/api/cars/${carId}`);
    dispatch({ type: "DELETE_CAR", payload: carId });
    dispatch(getAllCars()); // Refresh the car list after deletion
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: "LOADING", payload: false });
};
