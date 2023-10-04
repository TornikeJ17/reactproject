import React, { useEffect, useState } from "react";
import Cards from "../../../Widgets/Cards/Cards";
import cssStyles from "./Home.module.scss";
import { buttonIcons, SVG } from "../../../Icons/Icons";
import Man from "../../../../img/Man.png";
import Button from "../../../Widgets/Button/Button";
import { Link } from "react-router-dom";
const Home = ({products}) => {
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
                                        {products.map(item => item.productId).length}
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
                        height={"345px"}
                        background={"#FFFFFF"}
                        border={"20px"}
                        element={<div>hello world</div>}
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
