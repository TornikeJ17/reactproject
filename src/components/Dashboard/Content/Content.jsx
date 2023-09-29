import React, {useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import cssStyles from "./Content.module.scss";
import Home from "../../models/Menu/NavLinks/Home/Home";
import Orders from "../../models/Menu/NavLinks/Orders/Orders";
import Products from "../../models/Menu/NavLinks/Products/Products";
import Statistics from "../../models/Menu/NavLinks/Statistics/Statistics";
import Schedules from "../../models/Menu/NavLinks/Schedules/Schedules";
import Customers from "../../models/Menu/NavLinks/Customers/Customers";
import Settings from "../../models/Menu/NavLinks/Settings/Settings";
import Cards from "../../models/Widgets/Cards/Cards";
import ProductEditor from "../../models/Menu/NavLinks/Products/ProductEditor/ProductEditor";
import Profile from "../../models/Profile/Profile";
import ProductPage from "../../models/Menu/NavLinks/Products/ProductPage/ProductPage";
import {UserApi} from "../../api/api";
const Content = () => {
    const [data,setData]= React.useState([]);

    const getData = async () => {
        const response = await UserApi();
        setData(response);
        console.log(data)
    }
useEffect(() => {
    getData();
}, []);
    return (
        <div className={cssStyles.Content}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product-editor" element={<ProductEditor />} />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/schedules" element={<Schedules />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<div>error 404</div>} />
            </Routes>
        </div>
    );
};
export default Content;
