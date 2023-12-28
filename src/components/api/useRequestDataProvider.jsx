import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5130/api/";

const useRequestDataProvider = () => {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [loadingCreateProduct, setLoadingCreateProduct] = useState(false);
    const [loadingDeleteProduct, setLoadingDeleteProduct] = useState(false);

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

    return {
        loading,
        loadingCreateProduct,
        loadingDeleteProduct,
        UserApi,
        productCreateApi,
        productDelete,
    };
};

export default useRequestDataProvider;
