import axios from "axios";

const API_URL = "http://localhost:5279/api/";
const UserApi = async  () => {
   try {
      const response = await axios.get(API_URL + "User/user-list");
      return response.data;
   } catch (error) {
      console.log(error);
   }
}

const productCreateApi = async (create) => {
    try {
        const response = await axios.post(API_URL + "Product/product-create", create);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export { UserApi,productCreateApi };