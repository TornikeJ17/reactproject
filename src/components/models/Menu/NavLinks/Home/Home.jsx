import React, { useEffect, useState, useRef } from "react";
import Cards from "../../../Widgets/Cards/Cards";
import cssStyles from "./Home.module.scss";
import { buttonIcons, SVG } from "../../../Icons/Icons";
// import Button from "../../../Widgets/Button/Button";
import { Link } from "react-router-dom";
import { Chart } from "primereact/chart";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import useRequestDataProvider from "../../../../api/useRequestDataProvider";
import { Card } from "primereact/card";
const Home = ({
    products,
    loading,
    handleLogout,
    user,
    getUserDetailById,
    getUserDetails,
}) => {
    const { capitalizeFirstLetter } = useRequestDataProvider();
    const [chartDataProducts, setChartDataProducts] = useState({});
    const [chartDataAdmins, setChartDataAdmins] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const toast = useRef(null);

    const dateObj = new Date();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDay();
    const year = dateObj.getFullYear();
    const newDate = `${year}/${month.toString().padStart(2, "0")}/${day
        .toString()
        .padStart(2, "0")}`;

    const chartFunction = () => {
        const getPublish = () => {
            return products.filter((i) => i.productPublish === 1).length;
        };
        const getDrafts = () => {
            return products.filter((i) => i.productPublish === 0).length;
        };
        console.log(products.filter((i) => i.productPublish === 0).length);
        const data = {
            labels: ["Published", "Drafts"],
            datasets: [
                {
                    label: "Products",
                    data: [getPublish(), getDrafts()],
                    backgroundColor: ["#0891b2", "#06b6d4"],
                    borderColor: ["#0891b2", "#06b6d4"],
                    borderWidth: 2,
                    fill: false,
                    tension: 3,
                    borderDash: [1, 1],
                },
            ],
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: "#0891b2",
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "#0891b2",
                        font: {
                            weight: 500,
                        },
                    },
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: "#80808052",
                    },
                    grid: {
                        color: "#80808052",
                        drawBorder: false,
                    },
                },
            },
        };

        setChartDataProducts(data);
        setChartDataAdmins();
        setChartOptions(options);
    };
    useEffect(() => {
        chartFunction();
    }, [products]);

    return (
        <div className={cssStyles.MainContainer}>
            <div className={cssStyles.HomeContainer}>
                <Toast ref={toast} />
                <ConfirmDialog draggable={false} />
                <div className={cssStyles.SmallCardsContainer}>
                    <Card>
                        <div className={cssStyles.CardsContainer}>
                            <div className={cssStyles.CardsTitleContainer}>
                                <div className={cssStyles.CardsTitle}>
                                    Earnings of Month
                                </div>
                                <div className={cssStyles.CardsText}>
                                    $682.5
                                </div>
                            </div>
                            <div className={cssStyles.CardsIcon}>
                                {SVG[0].svg}
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className={cssStyles.CardsContainer}>
                            <div className={cssStyles.CardsTitleContainer}>
                                <div className={cssStyles.CardsTitle}>
                                    Products
                                </div>
                                <div className={cssStyles.CardsText}>
                                    {loading
                                        ? "Loading..."
                                        : products?.map(
                                              (item) => item.productId
                                          ).length}
                                </div>
                            </div>
                            <div className={cssStyles.CardsIcon}>
                                {SVG[3].svg}
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className={cssStyles.CardsContainer}>
                            <div className={cssStyles.CardsTitleContainer}>
                                <div className={cssStyles.CardsTitle}>
                                    New Admins
                                </div>
                                <div className={cssStyles.CardsText}>
                                    {getUserDetails.length}
                                </div>
                            </div>
                            <div className={cssStyles.CardsIcon}>
                                {SVG[1].svg}
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className={cssStyles.CardsContainer}>
                            <div className={cssStyles.CardsTitleContainer}>
                                <div className={cssStyles.CardsTitle}>
                                    New Orders
                                </div>
                                <div className={cssStyles.CardsText}>165</div>
                            </div>
                            <div className={cssStyles.CardsIcon}>
                                {SVG[2].svg}
                            </div>
                        </div>
                    </Card>
                </div>
                <div className={cssStyles.MediumCardsContainer}>
                    <Card>
                        <Chart
                            type="bar"
                            data={chartDataProducts}
                            options={chartOptions}
                            className={cssStyles.Chart}
                        />
                    </Card>
                    <Card>
                        <Chart
                            type="pie"
                            data={chartDataProducts}
                            options={chartOptions}
                            className={cssStyles.Chart}
                        />
                    </Card>
                    <Card>
                        <div className={cssStyles.ProfileBlock}>
                            <div className={cssStyles.ProfileIMG}>
                                <img
                                    src={getUserDetailById?.imageUrls}
                                    alt="man"
                                />
                                <div>
                                    <span className={cssStyles.ProfileName}>
                                        {capitalizeFirstLetter(user?.firstName)}{" "}
                                        {capitalizeFirstLetter(user?.lastName)}
                                    </span>
                                    <span className={cssStyles.ProfileStatus}>
                                        Admin
                                    </span>
                                    <span className={cssStyles.ProfileDate}>
                                        Current date: {newDate}
                                    </span>
                                </div>
                            </div>
                            <div className={cssStyles.ProfileButtonBlock}>
                                <Link to={"/profile"}>
                                    <Button
                                        icon={buttonIcons[7].icon}
                                        label={"Profile page"}
                                        severity="success"
                                    />
                                </Link>
                                <Button
                                    icon={buttonIcons[6].icon}
                                    severity="secondary"
                                    label={"Log Out"}
                                    onClick={handleLogout}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
                <div className={cssStyles.MediumCardsContainerSecond}>
                    <Card>
                        <Chart
                            type="bar"
                            data={chartDataProducts}
                            options={chartOptions}
                            className={cssStyles.Chart}
                        />
                    </Card>
                    <Card>
                        <Chart
                            type="line"
                            data={chartDataProducts}
                            options={chartOptions}
                            className={cssStyles.Chart}
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Home;
