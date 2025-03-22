import axios from "axios";
import { message } from "antd";

// ✅ User Login Action
export const userLogin = (reqObj) => async (dispatch) => {
    dispatch({ type: "LOADING", payload: true });

    try {
        const response = await axios.post("/api/users/login", reqObj);
        
        // ✅ Store user in localStorage
        localStorage.setItem("user", JSON.stringify(response.data));
        
        message.success("Login successful! 🚀");
        
        dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });

        // ✅ Redirect user to homepage after login
        window.location.href = "/";
    } catch (error) {
        console.error("Login Error:", error.response?.data?.message || error.message);
        message.error(error.response?.data?.message || "Invalid credentials.");
        dispatch({ type: "USER_LOGIN_FAILED", payload: error.message });
    } finally {
        dispatch({ type: "LOADING", payload: false });
    }
};

// ✅ User Registration Action
export const userRegister = (reqObj) => async (dispatch) => {
    dispatch({ type: "LOADING", payload: true });

    try {
        const response = await axios.post("/api/users/register", reqObj);

        message.success("Registration successful! 🎉 Please log in.");
        
        dispatch({ type: "USER_REGISTER_SUCCESS", payload: response.data });

        // ✅ Redirect to login page after registration
        setTimeout(() => {
            window.location.href = "/login";
        }, 1500);
    } catch (error) {
        console.error("Registration Error:", error.response?.data?.message || error.message);
        message.error(error.response?.data?.message || "Registration failed. Please try again.");
        dispatch({ type: "USER_REGISTER_FAILED", payload: error.message });
    } finally {
        dispatch({ type: "LOADING", payload: false });
    }
};
