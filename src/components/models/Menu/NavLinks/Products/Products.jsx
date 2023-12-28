import React, { useEffect, useState } from "react";
import Cards from "../../../Widgets/Cards/Cards";
import { ordersItems } from "../../../../api/order";
import cssStyles from "./Products.module.scss";
import Button from "../../../Widgets/Button/Button";
import { buttonIcons } from "../../../Icons/Icons";
import { Link, useNavigate } from "react-router-dom";
import { getResponsiveItemCount } from "../../../Widgets/Responsive/Responsive";
import { TabView, TabPanel } from "primereact/tabview";
import { Skeleton } from "primereact/skeleton";
import { Card } from "primereact/card";
import { Paginator } from "primereact/paginator";

const Products = ({
    products,
    setProducts,
    productDelete,
    loading,
    loadingCreateProduct,
}) => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(getResponsiveItemCount());
    const totalPages = Math.ceil(products?.length / itemsPerPage);
    const navigate = useNavigate();
    const maxPageNumbersToShow = 5;
    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };
    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(getResponsiveItemCount());
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [itemsPerPage]);
    const productPage = (id) => {
        navigate("/products/" + id, { state: { id: id } });
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
    const currentItems = products?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    console.log(products);
    return (
        <div className={cssStyles.Container}>
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
                <Link to={"/products/product-editor"}>
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
            <TabView>
                <TabPanel header="All Products">
                    <div className={cssStyles.ProductItemContainer}>
                        {loading ? (
                            <>
                                <Skeleton
                                    shape="square"
                                    size="15rem"
                                ></Skeleton>
                                <Skeleton
                                    shape="square"
                                    size="15rem"
                                ></Skeleton>
                                <Skeleton
                                    shape="square"
                                    size="15rem"
                                ></Skeleton>
                                <Skeleton
                                    shape="square"
                                    size="15rem"
                                ></Skeleton>
                                <Skeleton
                                    shape="square"
                                    size="15rem"
                                ></Skeleton>
                            </>
                        ) : (
                            currentItems
                                ?.filter((show) => show.productPublish !== 0)
                                .map((item, index) => (
                                    <Card key={index}>
                                        <div
                                            className={
                                                cssStyles.OrderElementBlock
                                            }
                                        >
                                            <div
                                                className={
                                                    cssStyles.ProductIMGBlock
                                                }
                                                onClick={() =>
                                                    productPage(item.id)
                                                }
                                            >
                                                {" "}
                                                {item.imageUrls?.map(
                                                    (image) => (
                                                        <img
                                                            className={
                                                                cssStyles.ProductImg
                                                            }
                                                            src={`http://localhost:5130${image}`}
                                                            alt={"s"}
                                                        />
                                                    )
                                                )}
                                            </div>
                                            <div>{item.productName}</div>
                                            <div
                                                className={
                                                    cssStyles.OrderElementText
                                                }
                                            >
                                                ${item.price}
                                            </div>
                                        </div>
                                    </Card>
                                ))
                        )}
                    </div>
                </TabPanel>
                <TabPanel header="Drafts">
                    <div className={cssStyles.ProductItemContainer}>
                        {loading ? (
                            <>
                                <Skeleton
                                    shape="square"
                                    size="15rem"
                                ></Skeleton>
                                <Skeleton
                                    shape="square"
                                    size="15rem"
                                ></Skeleton>
                                <Skeleton
                                    shape="square"
                                    size="15rem"
                                ></Skeleton>
                                <Skeleton
                                    shape="square"
                                    size="15rem"
                                ></Skeleton>
                                <Skeleton
                                    shape="square"
                                    size="15rem"
                                ></Skeleton>
                            </>
                        ) : (
                            currentItems
                                ?.filter((show) => show.productPublish === 0)
                                .map((item, index) => (
                                    <Card key={index}>
                                        <div
                                            className={
                                                cssStyles.OrderElementBlock
                                            }
                                        >
                                            <div
                                                className={
                                                    cssStyles.ProductIMGBlock
                                                }
                                                onClick={() =>
                                                    productPage(item.id)
                                                }
                                            >
                                                {" "}
                                                {item.imageUrls?.map(
                                                    (image) => (
                                                        <img
                                                            className={
                                                                cssStyles.ProductImg
                                                            }
                                                            src={`http://localhost:5130${image}`}
                                                            alt={"s"}
                                                        />
                                                    )
                                                )}
                                            </div>
                                            <div>{item.productName}</div>
                                            <div
                                                className={
                                                    cssStyles.OrderElementText
                                                }
                                            >
                                                ${item.price}
                                            </div>
                                        </div>
                                    </Card>
                                ))
                        )}
                    </div>
                </TabPanel>
            </TabView>
            <Paginator
                first={first}
                rows={rows}
                totalRecords={120}
                rowsPerPageOptions={[10, 20, 30]}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default Products;
