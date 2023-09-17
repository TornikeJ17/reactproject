import React from "react";
import cssStyles from "./Settings.module.scss";
import Cards from "../../../Widgets/Cards/Cards";
import Button from "../../../Widgets/Button/Button";

const Settings = () => {
    return (
        <div className={cssStyles.SettingsContainer}>
            <div className={cssStyles.Buttons}>
                <Button title={"Account"} />
                <Button title={"Notifications"} />
            </div>
            <Cards
                width={"100%"}
                height={"800px"}
                background={"#FFFFFF"}
                title={"Spent this month"}
            />
        </div>
    );
};

export default Settings;
