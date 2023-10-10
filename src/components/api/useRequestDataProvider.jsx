import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5279/api/";

const useRequestDataProvider = () => {
    const [loading, setLoading] = useState(false);

    const UserApi = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL + "Product/product-list");
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };
    const refetch = UserApi;
    const productCreateApi = async (productCreate) => {
        try {
            const response = await axios.post(
                API_URL + "Product/product-create",
                productCreate,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(productCreate);
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    const productDelete = async (productId) => {
        const url = API_URL + "Product/product-delete?id=" + productId;
        console.log("Deleting product with URL:", url);

        try {
            await axios.delete(url);
        } catch (error) {
            console.error("Error deleting product:", error.response.data);
        }
    };

    return {
        loading,
        UserApi,
        productCreateApi,
        productDelete,
        refetch,
    };
};

export default useRequestDataProvider;
