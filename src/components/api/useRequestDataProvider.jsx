import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5130/api/";

const useRequestDataProvider = () => {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [loadingCreateProduct, setLoadingCreateProduct] = useState(false);
    const [loadingDeleteProduct, setLoadingDeleteProduct] = useState(false);
    const [loadingByUser, setLoadingByUser] = useState(false);
    const [user, setUser] = useState({});

    const UserRegistration = async (registrationDetails) => {
        setLoading(true);
        try {
            const response = await axios.post(
                API_URL + "User/register",
                registrationDetails
            );
            setLoading(false);
            if (response.status === 201) {
                alert("Registration successful!");
                Navigate("/");
            }
        } catch (error) {
            setLoading(false);
            console.error("Error during registration:", error.message);
            // Handle error, e.g., show error message to the user
            if (error.response) {
                // The server responded with a status code outside the 2xx range
                console.error("Registration error:", error.response.data);
                alert("Registration failed: " + error.response.data);
            } else {
                // Something else went wrong
                console.error("Registration error:", error.message);
                alert("Registration failed: " + error.message);
            }
        }
    };
    const UserLogin = async (loginDetails) => {
        setLoading(true);
        try {
            // Prepare the data for the login operation
            const loginPayload = {
                email: loginDetails.email,
                password: loginDetails.password,
            };

            // Send a POST request with the login payload
            const response = await axios.post(
                API_URL + "User/login",
                loginPayload
            );

            // If the login is successful, handle the token from the response
            if (response.data && response.data.token) {
                localStorage.setItem("userToken", response.data.token);
                console.log("useRequest", response.data.userDetails);
            }
            setUser(response.data.userDetails);

            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            console.error("Error during login:", error.message);
            // Handle error, e.g., show error message to the user
            if (error.response) {
                // The server responded with a status code outside the 2xx range
                console.error("Login error:", error.response.data);
                alert("Login failed: " + error.response.data);
            } else {
                // Something happened setting up the request that triggered an error
                alert("Login failed: " + error.message);
            }
            return null;
        }
    };
    const getProductByUser = (userId) => {
        setLoadingByUser(true);
        try {
            const loadUserData = axios.get(`${API_URL}User/${userId}/product`);
            setLoadingByUser(false);
            return loadUserData;
        } catch (error) {
            setLoadingByUser(false);
            console.log(error);
        }
    };
    const UserApi = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL + "Product");
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };
    const userDetails = async () => {
        try {
            const response = await axios.get(API_URL + "User/userDetails");
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };
    const userDetailsById = async (userId) => {
        try {
            const response = await axios.get(
                API_URL + "User/userDetails/" + userId
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };
    const getUserAvatars = async () => {
        try {
            const response = await axios.get(API_URL + "User/Avatars");
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };
    const productCreateApi = async (formData) => {
        setLoadingCreateProduct(false);
        try {
            setLoadingCreateProduct(false);

            return await axios.post(API_URL + "Product", formData);
        } catch (error) {
            setLoadingCreateProduct(false);
            return { error: error.response.data, status: "error" };
        }
    };

    const productDelete = async (productId) => {
        setLoadingDeleteProduct(true);
        const url = API_URL + "Product/" + productId;
        try {
            const response = await axios.delete(url);
            setLoadingDeleteProduct(false);
            Navigate("/products");
            return response.data;
        } catch (error) {
            setLoadingDeleteProduct(false);
            console.error("Error deleting product:", error.response.data);
        }
    };
    const userDetailsUpdate = async (userId, formData) => {
        setLoading(true);
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        try {
            const response = await axios.put(
                `${API_URL}User/${userId}`,
                formData,
                config
            );
            setLoading(false);
            console.log("Profile updated successfully:", response.data);
            alert("Profile updated successfully"); // Display success message
            return response.data;
        } catch (error) {
            setLoading(false);
            if (error.response) {
                console.error("Error updating profile:", error.response.data);
                alert("Error updating profile: " + error.response.data.message); // Display error message
            } else {
                console.error("Error updating profile:", error.message);
                alert("Error updating profile: " + error.message); // Display error message
            }
        }
    };
    const capitalizeFirstLetter = (string) => {
        if (!string) return ""; // Check for null, undefined, and empty string
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    return {
        user,
        loading,
        loadingCreateProduct,
        loadingDeleteProduct,
        loadingByUser,
        UserRegistration,
        UserLogin,
        UserApi,
        userDetailsUpdate,
        userDetails,
        userDetailsById,
        getUserAvatars,
        productCreateApi,
        productDelete,
        getProductByUser,
        capitalizeFirstLetter,
    };
};

export default useRequestDataProvider;
