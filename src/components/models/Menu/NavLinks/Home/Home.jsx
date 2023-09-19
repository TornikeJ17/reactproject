import React, { useEffect, useState } from "react";
import Cards from "../../../Widgets/Cards/Cards";
import cssStyles from "./Home.module.scss";
import { SVG } from "../../../Icons/Icons";
const Home = () => {
    useEffect(() => {});
    return (
        <div className={cssStyles.MainContainer}>
            <div className={cssStyles.HomeContainer}>
                <div className={cssStyles.SmallCardsContainer}>
                    <Cards
                        width={"100%"}
                        height={"97px"}
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
                        height={"97px"}
                        border={"20px"}
                        element={
                            <div className={cssStyles.CardsContainer}>
                                <div className={cssStyles.CardsTitleContainer}>
                                    <div className={cssStyles.CardsTitle}>
                                        Products
                                    </div>
                                    <div className={cssStyles.CardsText}>
                                        37
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
                        height={"97px"}
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
                        height={"97px"}
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
                        background={"#FFFFFF"}
                        border={"20px"}
                        element={<div>hello world</div>}
                    />
                    <Cards
                        width={"100%"}
                        height={"345px"}
                        border={"20px"}
                        element={<div>hello world</div>}
                    />
                </div>
                <div className={cssStyles.MediumCardsContainerSecond}>
                    <Cards
                        width={"100%"}
                        height={"345px"}
                        border={"20px"}
                        element={<div>hello world</div>}
                    />
                    <Cards
                        width={"100%"}
                        height={"345px"}
                        border={"20px"}
                        element={<div>hello world</div>}
                    />
                    <Cards
                        width={"100%"}
                        height={"345px"}
                        border={"20px"}
                        element={<div>hello world</div>}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
