import React, { useState, useEffect } from "react";
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
import useRequestDataProvider from "../../api/useRequestDataProvider";
const Content = () => {
    const [data, setData] = useState([]);
    const { UserApi, productDelete, loading, refetch } =
        useRequestDataProvider();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await UserApi();
                setData(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []); // Dependency array includes refreshData so effect re-runs when it changes
    const addNewProduct = (newProduct) => {
        setData(prevProducts => [...prevProducts,newProduct])
    }
  
    return (
        <div className={cssStyles.Content}>
            <Routes>
                <Route
                    path="/"
                    element={<Home products={data} loading={loading} />}
                />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
                <Route
                    path="/products"
                    element={
                        <Products
                            products={data}
                            loading={loading}
                            productDelete={productDelete}
                            setProducts={setData}
                            refetch={refetch}
                        />
                    }
                />
                <Route path="/product-editor" element={<ProductEditor addNewProduct={addNewProduct}/>} />
                <Route
                    path="/products/:id"
                    element={<ProductPage products={data} />}
                />
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
