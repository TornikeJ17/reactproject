import React from "react";
import {useLocation} from "react-router-dom";
import {ordersItems} from "../../../../../api/order";

const ProductPage = () => {
    const location = useLocation();
    return(
        <div>
            <div>Product page</div>
            {ordersItems.map(item => item?.id === location.state?.id && (
                <div>
                    <div>{item.id}</div>
                    <div>{item.name}</div>
                </div>
            ))}
        </div>
    )
}

export default ProductPage