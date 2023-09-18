import React from "react";
import cssStyles from "./Orders.module.scss";
import Cards from "../../../Widgets/Cards/Cards";
import { orderIcons } from "../../../Icons/Icons";
import Breadcrumb from "../../../Widgets/Breadcrumb/Breadcrumb";

const Orders = () => {
    return (
        <div className={cssStyles.ContainerOrders}>
            <Breadcrumb />
            <div className={cssStyles.Blocks}>
                <Cards
                    width={"100%"}
                    height={"150px"}
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
                    element={
                        <div className={cssStyles.gridtable}>
                            <div className={cssStyles.gridtableBlock}>
                                <div className={cssStyles.header}>Order</div>
                                <div className={cssStyles.header}>Product</div>
                                <div className={cssStyles.header}>SKU</div>
                                <div className={cssStyles.header}>Category</div>
                                <div className={cssStyles.header}>Payment</div>
                                <div className={cssStyles.header}>
                                    Order Status
                                </div>
                                <div className={cssStyles.header}>Rate</div>
                                <div className={cssStyles.header}>Actions</div>
                            </div>

                            <div className={cssStyles.orderList}>
                                <div>#12345</div>
                                <div>
                                    <img
                                        style={{
                                            width: "70px",
                                            height: "70px",
                                        }}
                                        src={
                                            "https://shop-point.merku.love/assets/1-a5b55edd.webp"
                                        }
                                        alt="s"
                                    />
                                </div>
                                <div>123-ABC</div>
                                <div>Electronics</div>
                                <div>Credit Card</div>
                                <div>Processing</div>
                                <div>4.5</div>
                                <div className="actions">
                                    <a href="#">View</a> | <a href="#">Edit</a>{" "}
                                    | <a href="#">Delete</a>
                                </div>
                            </div>

                            <div className={cssStyles.orderList}>
                                <div>#12346</div>
                                <div>
                                    <img
                                        style={{
                                            width: "70px",
                                            height: "70px",
                                        }}
                                        src={
                                            "https://shop-point.merku.love/assets/1-a5b55edd.webp"
                                        }
                                        alt="s"
                                    />
                                </div>
                                <div>124-BCD</div>
                                <div>Home Appliance</div>
                                <div>PayPal</div>
                                <div>Shipped</div>
                                <div>5.0</div>
                                <div className="actions">
                                    <a href="#">View</a> | <a href="#">Edit</a>{" "}
                                    | <a href="#">Delete</a>
                                </div>
                            </div>
                            <div className={cssStyles.orderList}>
                                <div>#12345</div>
                                <div>
                                    <img
                                        style={{
                                            width: "70px",
                                            height: "70px",
                                        }}
                                        src={
                                            "https://shop-point.merku.love/assets/1-a5b55edd.webp"
                                        }
                                        alt="s"
                                    />
                                </div>
                                <div>123-ABC</div>
                                <div>Electronics</div>
                                <div>Credit Card</div>
                                <div>Processing</div>
                                <div>4.5</div>
                                <div className="actions">
                                    <a href="#">View</a> | <a href="#">Edit</a>{" "}
                                    | <a href="#">Delete</a>
                                </div>
                            </div>

                            <div className={cssStyles.orderList}>
                                <div>#12346</div>
                                <div>
                                    <img
                                        style={{
                                            width: "70px",
                                            height: "70px",
                                        }}
                                        src={
                                            "https://shop-point.merku.love/assets/1-a5b55edd.webp"
                                        }
                                        alt="s"
                                    />
                                </div>
                                <div>124-BCD</div>
                                <div>Home Appliance</div>
                                <div>PayPal</div>
                                <div>Shipped</div>
                                <div>5.0</div>
                                <div className="actions">
                                    <a href="#">View</a> | <a href="#">Edit</a>{" "}
                                    | <a href="#">Delete</a>
                                </div>
                            </div>
                        </div>
                    }
                />
            </div>
        </div>
    );
};

export default Orders;
