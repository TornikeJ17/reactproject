import React, { useEffect, useState } from "react";
import Cards from "../../../Widgets/Cards/Cards";
import cssStyles from "./Home.module.scss";
import { buttonIcons, SVG } from "../../../Icons/Icons";
import Man from "../../../../img/Man.png";
import Button from "../../../Widgets/Button/Button";
import { Link } from "react-router-dom";
import { Chart } from "primereact/chart";
const Home = ({ products, loading }) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const data = {
            labels: ["Q1", "Q2"],
            datasets: [
                {
                    label: "Sales",
                    data: [540, 325],
                    backgroundColor: ["#6366f1", "#6366f1"],
                    borderColor: ["#6366f1", "#6366f1"],
                    borderWidth: 0,
                },
                {
                    label: "Sales",
                    data: [540, 325],
                    backgroundColor: ["#bcbdfa", "#bcbdfa"],
                    borderColor: ["#6366f1", "#6366f1"],
                    borderWidth: 0,
                    width: "10px",
                },
            ],
        };
        const options = {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        };

        setChartData(data);
        setChartOptions(options);
    }, []);
    return (
        <div className={cssStyles.MainContainer}>
            <div className={cssStyles.HomeContainer}>
                <div className={cssStyles.SmallCardsContainer}>
                    <Cards
                        width={"100%"}
                        height={"150px"}
                        border={"20px"}
                        element={
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
                        }
                    />
                    <Cards
                        width={"100%"}
                        height={"150px"}
                        border={"20px"}
                        element={
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
                        }
                    />
                    <Cards
                        width={"100%"}
                        height={"150px"}
                        border={"20px"}
                        element={
                            <div className={cssStyles.CardsContainer}>
                                <div className={cssStyles.CardsTitleContainer}>
                                    <div className={cssStyles.CardsTitle}>
                                        New Clients
                                    </div>
                                    <div className={cssStyles.CardsText}>7</div>
                                </div>
                                <div className={cssStyles.CardsIcon}>
                                    {SVG[1].svg}
                                </div>
                            </div>
                        }
                    />
                    <Cards
                        width={"100%"}
                        height={"150px"}
                        border={"20px"}
                        element={
                            <div className={cssStyles.CardsContainer}>
                                <div className={cssStyles.CardsTitleContainer}>
                                    <div className={cssStyles.CardsTitle}>
                                        New Orders
                                    </div>
                                    <div className={cssStyles.CardsText}>
                                        165
                                    </div>
                                </div>
                                <div className={cssStyles.CardsIcon}>
                                    {SVG[2].svg}
                                </div>
                            </div>
                        }
                    />
                </div>
                <div className={cssStyles.MediumCardsContainer}>
                    <Cards
                        width={"100%"}
                        height={"345px"}
                        background={"transparent"}
                        border={"20px"}
                        element={
                            <Chart
                                type="bar"
                                data={chartData}
                                options={chartOptions}
                                className={cssStyles.Chart}
                            />
                        }
                    />
                    <Cards
                        width={"100%"}
                        height={"345px"}
                        border={"20px"}
                        element={
                            <div className={cssStyles.ProfileBlock}>
                                <div className={cssStyles.ProfileIMG}>
                                    <img src={Man} alt="man" />
                                    <div>
                                        <span className={cssStyles.ProfileName}>
                                            Tornike Jmukhadze
                                        </span>
                                        <span
                                            className={cssStyles.ProfileStatus}
                                        >
                                            Admin
                                        </span>
                                        <span className={cssStyles.ProfileDate}>
                                            last visit 21/09/23
                                        </span>
                                    </div>
                                </div>
                                <div className={cssStyles.ProfileButtonBlock}>
                                    <Link to={"/profile"}>
                                        <Button
                                            width={"100%"}
                                            height={"50px"}
                                            background={"#00BA9D"}
                                            icon={buttonIcons[7].icon}
                                            title={"Profile page"}
                                            color={"#fff"}
                                        />
                                    </Link>
                                    <Button
                                        width={"100%"}
                                        height={"50px"}
                                        background={"#b0b0b0"}
                                        icon={buttonIcons[6].icon}
                                        color={"#fff"}
                                        title={"Log Out"}
                                    />
                                </div>
                            </div>
                        }
                    />
                </div>
                <div className={cssStyles.MediumCardsContainerSecond}>
                    <Cards
                        width={"100%"}
                        height={"345px"}
                        border={"20px"}
                        element={
                            <Chart
                                type="bar"
                                data={chartData}
                                options={chartOptions}
                                className={cssStyles.Chart}
                            />
                        }
                    />
                    <Cards
                        width={"100%"}
                        height={"345px"}
                        border={"20px"}
                        element={
                            <Chart
                                type="bar"
                                data={chartData}
                                options={chartOptions}
                                className={cssStyles.Chart}
                            />
                        }
                    />
                    <Cards
                        width={"100%"}
                        height={"345px"}
                        border={"20px"}
                        element={
                            <Chart
                                type="line"
                                data={chartData}
                                options={chartOptions}
                                className={cssStyles.Chart}
                            />
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
