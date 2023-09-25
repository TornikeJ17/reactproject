import React, { useState, useEffect } from "react";
import cssStyles from "./Orders.module.scss";
import Cards from "../../../Widgets/Cards/Cards";
import { orderIcons } from "../../../Icons/Icons";
import Breadcrumb from "../../../Widgets/Breadcrumb/Breadcrumb";
import { ordersItems } from "../../../../api/order";
import Modal from "../../../Widgets/Modal/Modal";
import StarRating from "../../../Widgets/StarRating/StarRating";
import Button from "../../../Widgets/Button/Button";
import Dropdown from "../../../Widgets/Dropdown/Dropdown";
import Pagination from "../../../Widgets/Pagination/Pagination";

const Orders = () => {
    const [selectStatus, setSelectStatus] = useState(null);
    const [selectCategory, setSelectCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 7;

    const totalPages = Math.ceil(ordersItems.length / itemsPerPage);

    const maxPageNumbersToShow = 5;

    const startIndex = Math.max(
        1,
        currentPage - Math.floor(maxPageNumbersToShow / 2)
    );
    const endIndex = Math.min(
        startIndex + maxPageNumbersToShow - 1,
        totalPages
    );

    const [colors, setColors] = useState([
        { id: "#2D00F4" },
        { id: "#009275" },
        { id: "#FF3E3E" },
        { id: "#A1A1A1" },
    ]);
    const [open, setOpen] = useState(false);

    const orderOptions = [
        { id: "all", name: "All" },
        { id: 0, name: "Completed" },
        { id: 1, name: "Confirmed" },
        { id: 3, name: "Refunded" },
        { id: 2, name: "Canceled" },
    ];
    const categoryOptions = [
        { id: "all", name: "All" },
        { id: "Earrings", name: "Earrings" },
        { id: "Rings", name: "Rings" },
        { id: "Necklace", name: "Necklace" },
        { id: "Bracelets", name: "Bracelets" },
    ];

    const handleModal = () => {
        setOpen(!open);
    };
    const handleDropdown = (e) => {
        if (e.target.value === "all") {
            setSelectStatus(null);
        } else {
            setSelectStatus(Number(e.target.value));
        }
    };
    const handleDropdownCategory = (e) => {
        if (e.target.value === "all") {
            setSelectCategory(null);
        } else {
            setSelectCategory(e.target.value);
        }
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
        <div className={cssStyles.ContainerOrders}>
            <Cards
                width={"10%"}
                border={"10px"}
                element={<div className={cssStyles.OrdersTitle}>Orders</div>}
            />
            <div className={cssStyles.Blocks}>
                <Cards
                    width={"100%"}
                    height={"150px"}
                    border={"20px"}
                    element={
                        <div className={cssStyles.OrderElementBlock}>
                            <div>{orderIcons[0].icon}</div>
                            <div className={cssStyles.OrderElementTitle}>
                                Orders Completed
                            </div>
                            <div className={cssStyles.OrderElementText}>
                                2345
                            </div>
                        </div>
                    }
                />
                <Cards
                    width={"100%"}
                    height={"150px"}
                    border={"20px"}
                    element={
                        <div className={cssStyles.OrderElementBlock}>
                            <div>{orderIcons[1].icon}</div>
                            <div className={cssStyles.OrderElementTitle}>
                                Orders Confirmed
                            </div>
                            <div className={cssStyles.OrderElementText}>
                                323
                            </div>
                        </div>
                    }
                />
                <Cards
                    width={"100%"}
                    height={"150px"}
                    border={"20px"}
                    element={
                        <div className={cssStyles.OrderElementBlock}>
                            <div>{orderIcons[2].icon}</div>
                            <div className={cssStyles.OrderElementTitle}>
                                Orders Canceled
                            </div>
                            <div className={cssStyles.OrderElementText}>17</div>
                        </div>
                    }
                />
                <Cards
                    width={"100%"}
                    height={"150px"}
                    border={"20px"}
                    element={
                        <div className={cssStyles.OrderElementBlock}>
                            <div>{orderIcons[3].icon}</div>
                            <div className={cssStyles.OrderElementTitle}>
                                Orders Refunded{" "}
                            </div>
                            <div className={cssStyles.OrderElementText}>2</div>
                        </div>
                    }
                />
            </div>
            <div className={cssStyles.SecondBlock}>
                <Cards
                    width={"100%"}
                    height={"800px"}
                    border={"20px"}
                    element={
                        <div className={cssStyles.OrderHeightBlock}>
                            <div className={cssStyles.OrderFilterContainer}>
                                <Dropdown
                                    select={selectStatus}
                                    options={orderOptions}
                                    onChange={handleDropdown}
                                    width={150}
                                />
                                <Dropdown
                                    select={selectCategory}
                                    options={categoryOptions}
                                    onChange={handleDropdownCategory}
                                    width={150}
                                />
                            </div>
                            <div className={cssStyles.gridtable}>
                                <div className={cssStyles.gridtableBlock}>
                                    <div className={cssStyles.header}>
                                        Order
                                    </div>
                                    <div className={cssStyles.header}>
                                        Product
                                    </div>
                                    <div className={cssStyles.header}>SKU</div>
                                    <div className={cssStyles.header}>
                                        Category
                                    </div>
                                    <div className={cssStyles.header}>
                                        Payment
                                    </div>
                                    <div className={cssStyles.header}>
                                        Order Status
                                    </div>
                                    <div className={cssStyles.header}>Rate</div>
                                    <div className={cssStyles.header}>
                                        Actions
                                    </div>
                                </div>
                                {currentItems
                                    .filter(
                                        (f) =>
                                            (selectStatus === null ||
                                                f.status === selectStatus) &&
                                            (selectCategory === null ||
                                                f.category === selectCategory)
                                    )
                                    .map((item) => {
                                        const statusColor = colors[item.status]
                                            ? colors[item.status].id
                                            : "#A1A1A1";

                                        return (
                                            <div
                                                className={cssStyles.orderList}
                                            >
                                                <div>#{item.id}</div>
                                                <div>
                                                    <img
                                                        style={{
                                                            width: "70px",
                                                            height: "70px",
                                                        }}
                                                        src={item.icon}
                                                        alt="s"
                                                    />
                                                </div>
                                                <div>{item.sku}</div>
                                                <div>{item.category}</div>
                                                <div>{item.payment}</div>
                                                <div>
                                                    <span
                                                        style={{
                                                            background:
                                                                statusColor,
                                                        }}
                                                        className={
                                                            cssStyles.StatusColor
                                                        }
                                                    >
                                                        {item.status === 0
                                                            ? "Completed"
                                                            : item.status === 1
                                                            ? "Confirmed"
                                                            : item.status === 2
                                                            ? "Canceled"
                                                            : item.status === 3
                                                            ? "Refunded"
                                                            : ""}
                                                    </span>
                                                </div>

                                                <div>
                                                    {
                                                        <StarRating
                                                            totalStars={5}
                                                            initialRating={
                                                                item.rate
                                                            }
                                                            onRate={(rating) =>
                                                                console.log(
                                                                    `Rated: ${rating}`
                                                                )
                                                            }
                                                        />
                                                    }
                                                </div>
                                                <div
                                                    className={
                                                        cssStyles.actions
                                                    }
                                                >
                                                    <span
                                                        className={
                                                            cssStyles.orderViewIcon
                                                        }
                                                    >
                                                        {orderIcons[4].icon}
                                                    </span>
                                                    <span
                                                        className={
                                                            cssStyles.orderRemoveIcon
                                                        }
                                                        onClick={handleModal}
                                                    >
                                                        {orderIcons[5].icon}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                            <Pagination
                                onPrev={prevPage}
                                onPrevTitle={"Prev"}
                                onNext={nextPage}
                                onNextTitle={"Next"}
                                startIndex={startIndex}
                                endIndex={endIndex}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    }
                />
            </div>
            {open && (
                <Modal
                    isOpen={open}
                    onClose={() => setOpen(!open)}
                    children={<div>Product remove</div>}
                />
            )}
        </div>
    );
};

export default Orders;
