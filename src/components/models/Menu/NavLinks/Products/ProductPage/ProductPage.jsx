import React from "react";
import {useLocation} from "react-router-dom";
import {ordersItems} from "../../../../../api/order";

const ProductPage = ({products}) => {
    const location = useLocation();
    console.log(products)
    return(
        <div>
            <div>Product page</div>
            {products.map(item => item?.productId === location.state.productId && (
                <div>
                    <div>{item.description}</div>
                    <div>{item.productId}</div>
                </div>
            ))}
        </div>
    )
}

export default ProductPage