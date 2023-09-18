import React from "react";
import cssStyles from './Orders.module.scss'
import Cards from "../../../Widgets/Cards/Cards";


const Orders = () => {
    
    return (
        <div className={cssStyles.ContainerOrders}>
            <h1>Orders</h1>
            <div className={cssStyles.Blocks}>
                <Cards 
                    width={"100%"}
                    height={"150px"}
                    element={
                        <div>
                            <div className={cssStyles.OrderIcons}></div>
                            <div>Orders Completed</div>
                            <div>4.5</div>
                        </div>
                    }
                />
                <Cards
                    width={"100%"}
                    height={"150px"}
                    element={
                        <div>
                            <div></div>
                            <div>Orders Confirmed</div>
                            <div>4.5</div>
                        </div>
                    }
                />
                <Cards
                    width={"100%"}
                    height={"150px"}
                    element={
                        <div>
                            <div></div>
                            <div>Orders Canceled</div>
                            <div>4.5</div>
                        </div>
                    }
                />
                <Cards
                    width={"100%"}
                    height={"150px"}
                    element={
                        <div>
                            <div></div>
                            <div>Orders Refunded </div>
                            <div>4.5</div>
                        </div>
                    }
                />
            </div>
        </div>
    )
}

export default Orders