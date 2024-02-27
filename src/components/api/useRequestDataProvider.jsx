import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL_Local = "https://localhost:7225/api/";
const API_URL = "https://3522.somee.com/api/";

const useRequestDataProvider = () => {
    const [getUserDetails, setGetUserDetails] = useState([]);
    const [updateUserDetails, setUpdateUserDetails] = useState({});
    const [getProductId, setGetProductId] = useState({});

    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [loadingCreateProduct, setLoadingCreateProduct] = useState(false);
    const [LoadingUpdateProduct, setLoadingUpdateProduct] = useState(false);
    const [loadingDeleteProduct, setLoadingDeleteProduct] = useState(false);
    const [loadingByUser, setLoadingByUser] = useState(false);
    const [loadingUpdateUser, setLoadingUpdateUser] = useState(false);
    const [loadingDeleteAdmin, setLoadingDeleteAdmin] = useState(false);
    const [user, setUser] = useState({});

    //! USER REGISTRATION
    const UserRegistration = async (registrationDetails) => {
        setLoading(true);
        try {
            const response = await axios.post(
                API_URL + "User/register",
                registrationDetails
            );
            Navigate("/");
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
    //! USER REGISTRATION

    //! USER LOGIN
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
    //! USER LOGIN

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
        setLoadingProducts(true);
        try {
            const response = await axios.get(API_URL + "Product");
            return response.data;
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingProducts(false);
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

    const productUpdateApi = async (productId, formData) => {
        setLoadingUpdateProduct(true);
        try {
            const response = await axios.put(
                API_URL + "Product/" + productId,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setLoadingUpdateProduct(false);
            return response.data;
        } catch (error) {
            setLoadingUpdateProduct(false);
            return { error: error.response.data, status: "error" };
        }
    };

    const getProductById = async (productId) => {
        try {
            const response = await axios.get(API_URL + "Product/" + productId);
            setGetProductId(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
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
        setLoadingUpdateUser(true);
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
            setLoadingUpdateUser(false);
            console.log("Profile updated successfully:", response.data);

            return response.data;
        } catch (error) {
            setLoadingUpdateUser(false);
            if (error.response) {
                console.error("Error updating profile:", error.response.data);
                alert("Error updating profile: " + error.response.data.message); // Display error message
            } else {
                console.error("Error updating profile:", error.message);
                alert("Error updating profile: " + error.message); // Display error message
            }
        }
    };
    const userDeleteById = async (adminId, setGetUserDetails) => {
        setLoadingDeleteAdmin(true);
        try {
            setLoadingDeleteAdmin(false);
            const response = await axios.delete(API_URL + "User/" + adminId);
            setGetUserDetails((currentDetails) =>
                currentDetails.filter((userDetail) => userDetail.id !== adminId)
            );
            return response.data;
        } catch (error) {
            setLoadingDeleteAdmin(false);
            console.log(error);
        }
    };
    const capitalizeFirstLetter = (string) => {
        if (!string) return ""; // Check for null, undefined, and empty string
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    return {
        user,
        loading,
        loadingProducts,
        loadingCreateProduct,
        LoadingUpdateProduct,
        loadingDeleteProduct,
        loadingByUser,
        loadingDeleteAdmin,
        loadingUpdateUser,
        UserRegistration,
        UserLogin,
        UserApi,
        userDetailsUpdate,
        userDetails,
        userDetailsById,
        getUserAvatars,
        productCreateApi,
        productUpdateApi,
        getProductById,
        getProductId,
        productDelete,
        getProductByUser,
        userDeleteById,
        capitalizeFirstLetter,
        setGetUserDetails,
        getUserDetails,
        updateUserDetails,
        setUpdateUserDetails,
    };
};

export default useRequestDataProvider;
