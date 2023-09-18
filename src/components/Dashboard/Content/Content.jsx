import React from "react";
import { Routes, Route } from "react-router-dom";
import cssStyles from "./Content.module.scss"
import Home from "../../models/Menu/NavLinks/Home/Home";
import Orders from "../../models/Menu/NavLinks/Orders/Orders";
import Products from "../../models/Menu/NavLinks/Products/Products";
import Statistics from "../../models/Menu/NavLinks/Statistics/Statistics";
import Schedules from "../../models/Menu/NavLinks/Schedules/Schedules";
import Customers from "../../models/Menu/NavLinks/Customers/Customers";
import Settings from "../../models/Menu/NavLinks/Settings/Settings";
const Content = () => {
    return(
        <div className={cssStyles.Content}>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/products' element={<Products />} />
            <Route path='/statistics' element={<Statistics />} />
            <Route path='/schedules' element={<Schedules />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/settings' element={<Settings />} />
        </Routes>
        </div>
    )
}
export default Content