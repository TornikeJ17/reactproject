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
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import ProductUpdate from "../../models/Menu/NavLinks/Products/ProductUpdate/ProductUpdate";

const Content = ({ hide, setClick, handleLogout, user }) => {
    const toast = useRef(null);
    const [data, setData] = useState([]);
    const [productsByUser, setProductsByUser] = useState([]);
    const [getUserDetailById, setGetUserDetailById] = useState({});
    const [getUserAvatarsImages, setGetUserAvatarsImages] = useState([]);
    const [getUserAfterDelete, setGetUserAfterDelete] = useState([]);
    const menuLeft = useRef(null);
    const {
        UserLogin,
        UserApi,
        userDetails,
        userDetailsById,
        userDetailsUpdate,
        getProductById,
        productDelete,
        getProductByUser,
        getUserAvatars,
        userDeleteById,
        setGetUserDetails,
        getUserDetails,
        getProductId,
        loading,
        loadingCreateProduct,
        loadingDeleteAdmin,
        loadingProducts,
        loadingUpdateUser,
        refetch,
        updateUserDetails,
        setUpdateUserDetails,
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
    };
    const updateProduct = (updatedProduct) => {
        setData((prevProducts) =>
            prevProducts.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            )
        );
    };

    return (
        <div className={cssStyles.Content}>
            <Toast ref={toast} />
            <ConfirmDialog draggable={false} />
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
                            setGetUserDetailById={setGetUserDetailById}
                            userDetailsUpdate={userDetailsUpdate}
                            getUserAvatarsImages={getUserAvatarsImages}
                            loadingUpdateUser={loadingUpdateUser}
                        />
                    }
                />
                <Route path="/orders" element={<Orders />} />
                <Route
                    path="/products"
                    element={
                        <Products
                            products={data}
                            loadingProducts={loadingProducts}
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
                    path="/products/:productName/:id"
                    element={
                        <ProductUpdate
                            updateProduct={updateProduct}
                            getProductId={getProductId}
                            user={user}
                        />
                    }
                />
                <Route
                    path="/products/:productName"
                    element={
                        <ProductPage
                            products={data}
                            getProductById={getProductById}
                            productDelete={productDelete}
                        />
                    }
                />
                <Route path="/statistics" element={<Statistics />} />
                <Route
                    path="/admins"
                    element={
                        <Admins
                            user={user}
                            getUserDetails={getUserDetails}
                            setGetUserDetails={setGetUserDetails}
                            userDeleteOnClick={userDeleteById}
                            loadingDeleteAdmin={loadingDeleteAdmin}
                            getUserAfterDelete={getUserAfterDelete}
                        />
                    }
                />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<div>error 404</div>} />
            </Routes>
        </div>
    );
};
export default Content;
