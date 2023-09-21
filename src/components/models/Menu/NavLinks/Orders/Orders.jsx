import React, {useState,useEffect} from "react";
import cssStyles from "./Orders.module.scss";
import Cards from "../../../Widgets/Cards/Cards";
import { orderIcons } from "../../../Icons/Icons";
import Breadcrumb from "../../../Widgets/Breadcrumb/Breadcrumb";
import { ordersItems } from "../../../../api/order";
import Modal from "../../../Widgets/Modal/Modal";


const Orders = () => {
    const [colors,setColors] = useState([]);
    const [open,setOpen] = useState(false);
    useEffect(() => {
        setColors({
            0:"#2D00F4",
            1:"#009275",
            2:"#FF3E3E",
            3:"#A1A1A1",
        })
    })
    const handleModal = () => {
        setOpen(!open);
    }
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
                    overflow={"auto"}
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
                            {ordersItems.map((item) => (
                                <div className={cssStyles.orderList}>
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
                                    <div><span style={{background: colors[3]}}>{item.status}</span></div>
                                    <div>{item.rate}</div>
                                    <div className={cssStyles.actions}>
                                        <span
                                            className={cssStyles.orderViewIcon}
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
                            ))}
                        </div>
                    }
                />
            </div>
            {open && <Modal isOpen={open} onClose={() => setOpen(!open)} children={<div>Product remove</div>}/>}
        </div>
    );
};

export default Orders;
