import React, { useState } from "react";
import Cards from "../../../Widgets/Cards/Cards";
import { ordersItems, } from "../../../../api/order";
import cssStyles from "./Products.module.scss";
import Button from "../../../Widgets/Button/Button";
import { buttonIcons } from "../../../Icons/Icons";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../../Widgets/Pagination/Pagination";
import {productDelete} from "../../../../api/api";
import Modal from "../../../Widgets/Modal/Modal";

const Products = ({products}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const navigate = useNavigate();
    const maxPageNumbersToShow = 5;
    const [deleteProductModal, setDeleteProductModal] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState(null);

    const productPage = (id) => {
        navigate("/products/" + id, { state: { productId: id } });
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
    const startIndex = Math.max(
        1,
        currentPage - Math.floor(maxPageNumbersToShow / 2)
    );
    const endIndex = Math.min(
        startIndex + maxPageNumbersToShow - 1,
        totalPages
    );
    const currentItems = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const deleteProduct = async (closeModal) => {
        await productDelete(deleteProductId);
        setDeleteProductModal(closeModal)
    }
    const deleteModal = (e) => {
        setDeleteProductModal(!deleteProductModal);
        setDeleteProductId(e)
    }
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
                        gap={"6px"}
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
                                    onClick={() => productPage(item.productId)}
                                >
                                    <div className={cssStyles.ProductIMGBlock}>
                                        {item.imagePaths?.map((image) => 
                                            <img 
                                                src={`http://localhost:5279${image.slice(7)}`}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    aspectRatio: "1/1",
                                                    objectFit: "contain",
                                                }}
                                                alt={"s"}
                                            />
                                        )}
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
                                        onClick={() => deleteModal(item.productId)}
                                    />
                                </div>
                               
                            </div>
                        }
                    />
                ))}
            </div>
            <Pagination
                onPrev={prevPage}
                onPrevTitle={buttonIcons[8].icon}
                onNext={nextPage}
                onNextTitle={buttonIcons[9].icon}
                startIndex={startIndex}
                endIndex={endIndex}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
            {deleteProductModal && (
                <Modal
                    isOpen={deleteProductModal}
                    onClose={() => setDeleteProductModal(!deleteProductModal)}
                    children={
                        <div>
                            <h4>Are you sure you want to delete product?</h4>
                            <button onClick={(e) => deleteProduct(!deleteProductModal)}>Yes</button>
                            <button onClick={() => setDeleteProductModal(!deleteProductModal)}>No</button>
                        </div>
                    }
                />
            )}
        </div>
    );
};

export default Products;
