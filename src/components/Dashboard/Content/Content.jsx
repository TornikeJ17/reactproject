import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import cssStyles from "./Content.module.scss";
import Home from "../../models/Menu/NavLinks/Home/Home";
import Orders from "../../models/Menu/NavLinks/Orders/Orders";
import Products from "../../models/Menu/NavLinks/Products/Products";
import Statistics from "../../models/Menu/NavLinks/Statistics/Statistics";
import Customers from "../../models/Menu/NavLinks/Customers/Customers";
import Settings from "../../models/Menu/NavLinks/Settings/Settings";
import ProductEditor from "../../models/Menu/NavLinks/Products/ProductEditor/ProductEditor";
import Profile from "../../models/Profile/Profile";
import ProductPage from "../../models/Menu/NavLinks/Products/ProductPage/ProductPage";
import useRequestDataProvider from "../../api/useRequestDataProvider";
import { buttonIcons } from "../../models/Icons/Icons";
import { BreadCrumb } from "primereact/breadcrumb";
import Breadcrumb from "../../models/Widgets/Breadcrumb/Breadcrumb";
const Content = ({ hide, setClick }) => {
    const [data, setData] = useState([]);
    const { UserApi, productDelete, loading, loadingCreateProduct, refetch } =
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
    }, []);
    console.log();
    const addNewProduct = (newProduct) => {
        setData((prevProducts) => [...prevProducts, newProduct]);
    };
    return (
        <div className={cssStyles.Content}>
            <div className={cssStyles.BreadCrumbAndMenuBlock}>
                <div className={cssStyles.HideMenu} onClick={() => setClick()}>
                    {buttonIcons[10].icon}
                </div>
                <div>
                    <Breadcrumb />
                </div>
            </div>
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
                            loadingCreateProduct={loadingCreateProduct}
                            productDelete={productDelete}
                            setProducts={setData}
                            refetch={refetch}
                        />
                    }
                />
                <Route
                    path="/products/product-editor"
                    element={<ProductEditor addNewProduct={addNewProduct} />}
                />
                <Route
                    path="/products/:id"
                    element={<ProductPage products={data} />}
                />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<div>error 404</div>} />
            </Routes>
        </div>
    );
};
export default Content;
