import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import cssStyles from "./Content.module.scss";
import Home from "../../models/Menu/NavLinks/Home/Home";
import Orders from "../../models/Menu/NavLinks/Orders/Orders";
import Products from "../../models/Menu/NavLinks/Products/Products";
import Statistics from "../../models/Menu/NavLinks/Statistics/Statistics";
import Admins from "../../models/Menu/NavLinks/Admins/Admins";
import Settings from "../../models/Menu/NavLinks/Settings/Settings";
import ProductCreate from "../../models/Menu/NavLinks/Products/ProductCreate/ProductCreate";
import Profile from "../../models/Profile/Profile";
import ProductPage from "../../models/Menu/NavLinks/Products/ProductPage/ProductPage";
import useRequestDataProvider from "../../api/useRequestDataProvider";
import { buttonIcons } from "../../models/Icons/Icons";
import Breadcrumb from "../../models/Widgets/Breadcrumb/Breadcrumb";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";

const Content = ({ hide, setClick, handleLogout, user }) => {
    const [data, setData] = useState([]);
    const [productsByUser, setProductsByUser] = useState([]);
    const [getUserDetails, setGetUserDetails] = useState([]);
    const [getUserDetailById, setGetUserDetailById] = useState({});
    const [getUserAvatarsImages, setGetUserAvatarsImages] = useState([]);
    const menuLeft = useRef(null);
    const {
        UserLogin,
        UserApi,
        userDetails,
        userDetailsById,
        userDetailsUpdate,
        productDelete,
        getProductByUser,
        getUserAvatars,
        loading,
        loadingCreateProduct,
        refetch,
    } = useRequestDataProvider();

    const ProfileItem = [
        {
            label: <Link to={"/profile"}>Profile</Link>,
            icon: buttonIcons[18].icon,
        },
        {
            label: "Log out",
            icon: buttonIcons[17].icon,
            command: () => handleLogout(),
        },
    ];
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
        const fetchProductsByUser = async () => {
            try {
                const response = await getProductByUser(user.id);
                setProductsByUser(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchProductsByUser();
        const fetchGetUserDetails = async () => {
            try {
                const response = await userDetails();
                setGetUserDetails(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchGetUserDetails();
        const fetchGetUserDetailsById = async () => {
            try {
                const response = await userDetailsById(user.id);
                console.log("response:", response);
                setGetUserDetailById(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchGetUserDetailsById();
        const fetchGetUserAvatarImages = async () => {
            try {
                const response = await getUserAvatars();
                setGetUserAvatarsImages(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchGetUserAvatarImages();
    }, []);
    const addNewProduct = (newProduct) => {
        setData((prevProducts) => [...prevProducts, newProduct]);
        console.log(getUserDetailById, "getUserDetailById");
    };
    return (
        <div className={cssStyles.Content}>
            <div className={cssStyles.BreadCrumbAndMenuBlock}>
                <div className={cssStyles.HideMenu} onClick={() => setClick()}>
                    {buttonIcons[10].icon}
                </div>

                {!getUserDetailById.imageUrls ? (
                    <Avatar
                        image="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                        className="mr-2"
                        size="large"
                        shape="circle"
                        onClick={(e) => menuLeft.current.toggle(e)}
                    />
                ) : (
                    <Avatar
                        image={getUserDetailById?.imageUrls}
                        className="mr-2"
                        size="large"
                        shape="circle"
                        onClick={(e) => menuLeft.current.toggle(e)}
                    />
                )}
                <Menu model={ProfileItem} popup ref={menuLeft} />
                <div>
                    <Breadcrumb />
                </div>
            </div>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            products={data}
                            loading={loading}
                            handleLogout={handleLogout}
                            user={user}
                            getUserDetailById={getUserDetailById}
                            getUserDetails={getUserDetails}
                        />
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <Profile
                            user={user}
                            products={data}
                            productsByUser={productsByUser}
                            getUserDetailById={getUserDetailById}
                            userDetailsUpdate={userDetailsUpdate}
                            getUserAvatarsImages={getUserAvatarsImages}
                            loading={loading}
                        />
                    }
                />
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
                    element={
                        <ProductCreate
                            addNewProduct={addNewProduct}
                            user={user}
                        />
                    }
                />
                <Route
                    path="/products/:productName"
                    element={<ProductPage products={data} />}
                />
                <Route path="/statistics" element={<Statistics />} />
                <Route
                    path="/admins"
                    element={<Admins getUserDetails={getUserDetails} />}
                />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<div>error 404</div>} />
            </Routes>
        </div>
    );
};
export default Content;
