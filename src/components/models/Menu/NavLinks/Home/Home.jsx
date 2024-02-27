import React, { useEffect, useState, useRef } from "react";
import cssStyles from "./Home.module.scss";
import { buttonIcons, SVG } from "../../../Icons/Icons";
import { Link } from "react-router-dom";
import { Chart } from "primereact/chart";
import { Button } from "primereact/button";
import useRequestDataProvider from "../../../../api/useRequestDataProvider";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
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
    const [chartDataAdmins, setChartDataAdmins] = useState([]);
    const [chartOptions, setChartOptions] = useState({});

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
        const getAdmins = () => {
            return getUserDetails.filter((i) => i).length;
        };
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
        const dataAdmins = {
            labels: ["Admins"],
            datasets: [
                {
                    label: "Admins",
                    data: [getAdmins()],
                    backgroundColor: ["#0891b2"],
                    borderColor: ["#0891b2"],
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
        setChartDataAdmins(dataAdmins);
        setChartOptions(options);
    };
    const responsiveOptions = [
        {
            breakpoint: "1400px",
            numVisible: 2,
            numScroll: 1,
        },
        {
            breakpoint: "1199px",
            numVisible: 3,
            numScroll: 1,
        },
        {
            breakpoint: "767px",
            numVisible: 2,
            numScroll: 1,
        },
        {
            breakpoint: "575px",
            numVisible: 1,
            numScroll: 1,
        },
    ];
    useEffect(() => {
        chartFunction();
    }, [products, getUserDetails]);

    const productTemplate = (product) => {
        return (
            <div>
                <div>
                    <Image
                        width="250"
                        height="250"
                        style={{ borderRadius: "10px" }}
                        src={`https://3522.somee.com${product.imageUrls}`}
                        alt={product.name}
                    />
                </div>
                <div>
                    <h4>{product.name}</h4>
                    <h6 className="mt-0 mb-3">${product.price}</h6>
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button
                            icon="pi pi-search"
                            className="p-button p-button-rounded"
                        />
                        <Button
                            icon="pi pi-star-fill"
                            className="p-button-success p-button-rounded"
                        />
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div className={cssStyles.MainContainer}>
            <div className={cssStyles.HomeContainer}>
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
                            data={chartDataAdmins}
                            options={chartOptions}
                            className={cssStyles.Chart}
                        />
                    </Card>
                    <Card>
                        <div className={cssStyles.ProfileBlock}>
                            <div className={cssStyles.ProfileIMG}>
                                {!getUserDetailById?.imageUrls ? (
                                    <Image
                                        src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                                        alt="Image"
                                        width="200"
                                        height="200"
                                        className={cssStyles.Avatar}
                                    />
                                ) : (
                                    <Image
                                        src={getUserDetailById?.imageUrls}
                                        alt="Image"
                                        width="200"
                                        height="200"
                                        className={cssStyles.Avatar}
                                    />
                                )}

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
                    <Card
                        footer={
                            <Chart
                                type="line"
                                data={chartDataProducts}
                                options={chartOptions}
                                className={cssStyles.Chart}
                            />
                        }
                    />

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
