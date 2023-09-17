import React from "react";
import { Routes, Route } from "react-router-dom";
import cssStyles from "./Content.module.scss"
import Home from "../../models/Menu/NavLinks/Home/Home";
import Activity from "../../models/Menu/NavLinks/Activity/Activity";
import Library from "../../models/Menu/NavLinks/Library/Library";
import Security from "../../models/Menu/NavLinks/Security/Security";
import Schedules from "../../models/Menu/NavLinks/Schedules/Schedules";
import Payouts from "../../models/Menu/NavLinks/Payouts/Payouts";
import Settings from "../../models/Menu/NavLinks/Settings/Settings";
const Content = () => {
    return(
        <div className={cssStyles.Content}>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/activity' element={<Activity />} />
            <Route path='/library' element={<Library />} />
            <Route path='/security' element={<Security />} />
            <Route path='/schedules' element={<Schedules />} />
            <Route path='/payouts' element={<Payouts />} />
            <Route path='/settings' element={<Settings />} />
        </Routes>
        </div>
    )
}
export default Content