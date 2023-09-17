import React, { useEffect, useState } from "react";
import Cards from "../../../Widgets/Cards/Cards";
import cssStyles from "./Home.module.scss";
import { SVG } from "../../../Icons/Icons";
const Home = () => {
    const [click, setClick] = useState(false);

    useEffect(() => {});
    return (
        <div className={cssStyles.MainContainer}>
            <div className={cssStyles.WelcomeContainer}>
                <div>
                    <div className={cssStyles.WelcomeName}>Hi Tornike,</div>
                    <div className={cssStyles.Welcome}>Welcome to Venus!</div>
                </div>
                <div>
                    <input />
                </div>
            </div>
            <div className={cssStyles.HomeContainer}>
                <div className={cssStyles.SmallCardsContainer}>
                    <Cards
                        width={"100%"}
                        height={"97px"}
                        background={"#FFFFFF"}
                        title={"Spent this month"}
                        text={"$682.5"}
                        icon={SVG[0].svg}
                    />
                    <Cards
                        width={"100%"}
                        height={"97px"}
                        background={"#FFFFFF"}
                        title={
                            <div onClick={() => setClick(!click)}>Click me</div>
                        }
                    />
                    <Cards
                        width={"100%"}
                        height={"97px"}
                        background={"#FFFFFF"}
                        title={<div>{click && <div>Hi</div>}</div>}
                    />
                    <Cards
                        width={"100%"}
                        height={"97px"}
                        background={"#FFFFFF"}
                    />
                </div>
                <div className={cssStyles.MediumCardsContainer}>
                    <Cards
                        width={"100%"}
                        height={"345px"}
                        background={"#FFFFFF"}
                    />
                    <Cards
                        width={"100%"}
                        height={"345px"}
                        background={"#FFFFFF"}
                    />
                </div>
                <div className={cssStyles.MediumCardsContainerSecond}>
                    <Cards
                        width={"100%"}
                        height={"345px"}
                        background={"#FFFFFF"}
                    />
                    <Cards
                        width={"100%"}
                        height={"345px"}
                        background={"#FFFFFF"}
                    />
                    <Cards
                        width={"100%"}
                        height={"345px"}
                        background={"#FFFFFF"}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
