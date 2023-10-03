import axios from "axios";

const API_URL = "http://localhost:5279/api/";
const UserApi = async () => {
    try {
        const response = await axios.get(API_URL + "Product/product-list");
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const productCreateApi = async (productCreate) => {
    try {
        const response = await axios.post(
            API_URL + "Product/product-create",
            productCreate,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        console.log(productCreate)
        console.log(response)
        return response;
    } catch (error) {
        console.log(error);
    }
};

export { UserApi, productCreateApi };
