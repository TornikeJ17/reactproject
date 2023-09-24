import React, { useState } from "react";
import Cards from "../../../Widgets/Cards/Cards";
import { ordersItems } from "../../../../api/order";
import cssStyles from "./Products.module.scss";
import Button from "../../../Widgets/Button/Button";
import { buttonIcons } from "../../../Icons/Icons";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(ordersItems.length / itemsPerPage);
    const navigate = useNavigate();

    const productPage = (id) => {
        navigate(`/products/${id}`);
    };
    const nextPage = () => {
        setCurrentPage((prevPage) => {
            if (prevPage === totalPages) {
                return prevPage;
            } else {
                return prevPage + 1;
            }
        });
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => {
            if (prevPage === 1) {
                return prevPage;
            } else {
                return prevPage - 1;
            }
        });
    };
    const currentItems = ordersItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    return (
        <div className={cssStyles.Container}>
            <div>
                <Cards
                    width={"10%"}
                    border={"10px"}
                    height={"44px"}
                    element={
                        <div className={cssStyles.ProductsTitle}>Products</div>
                    }
                />
            </div>
            <div className={cssStyles.ProductEditContainer}>
                <Cards
                    width={"100%"}
                    border={"8px"}
                    element={
                        <div>
                            <div>saf</div>
                        </div>
                    }
                />
                <Link to={"/product-editor"}>
                    <Button
                        title={"Add new product"}
                        icon={buttonIcons[2].icon}
                        gap={"8px"}
                        height={"30px"}
                        background={"#00BA9D"}
                        padding={"20px"}
                    />
                </Link>
            </div>
            <div className={cssStyles.ProductItemContainer}>
                {currentItems.map((item, index) => (
                    <Cards
                        key={index}
                        width={"100%"}
                        height={"342.5px"}
                        border={"20px"}
                        element={
                            <div className={cssStyles.OrderElementBlock}>
                                <div
                                    className={cssStyles.ClickCard}
                                    onClick={() => productPage(item.id)}
                                >
                                    <div className={cssStyles.ProductIMGBlock}>
                                        <img
                                            src={item.icon}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                aspectRatio: "1/1",
                                                objectFit: "contain",
                                            }}
                                            alt={"s"}
                                        />
                                    </div>
                                    <div
                                        className={cssStyles.OrderElementTitle}
                                    >
                                        {item.name}
                                    </div>
                                    <div className={cssStyles.OrderElementText}>
                                        ${item.price}
                                    </div>
                                </div>
                                <div
                                    className={
                                        cssStyles.ProductsButtonsContainer
                                    }
                                >
                                    <Button
                                        icon={buttonIcons[0].icon}
                                        background={"#2F00FF"}
                                        width={"50px"}
                                    />
                                    <Button
                                        icon={buttonIcons[1].icon}
                                        background={"#FF3E3E"}
                                        width={"50px"}
                                    />
                                </div>
                            </div>
                        }
                    />
                ))}
            </div>
            <div>
                <Button title={"Prev"} onClick={prevPage} />
                <Button title={"Next"} onClick={nextPage} />
            </div>
        </div>
    );
};

export default Products;
