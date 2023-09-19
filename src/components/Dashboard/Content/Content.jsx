import React from "react";
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
const Content = () => {
    return (
        <div className={cssStyles.Content}>
            <div className={cssStyles.WelcomeContainer}>
                <div className={cssStyles.WelcomeBlock}>
                    <div className={cssStyles.WelcomeName}>Hi Tornike,</div>
                    <div className={cssStyles.Welcome}>Welcome to Venus!</div>
                </div>
                <Cards
                    width={"100%"}
                    height={"97px"}
                    border={"20px"}
                    element={<div>saf</div>}
                />
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/products" element={<Products />} />
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
