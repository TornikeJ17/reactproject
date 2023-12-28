import React, { useEffect, useState } from "react";
import { Link, redirect, useLocation } from "react-router-dom";
import cssStyles from "../ProductEditor/ProductEditor.module.scss";
import Cards from "../../../../Widgets/Cards/Cards";
import { buttonIcons, radioItems } from "../../../../Icons/Icons";
import useRequestDataProvider from "../../../../../api/useRequestDataProvider";
import { Galleria } from "primereact/galleria";
import { InputSwitch } from "primereact/inputswitch";
const ProductPage = ({ products }) => {
    const [images, setImages] = useState(null);
    const { productDelete } = useRequestDataProvider();
    const location = useLocation();

    return (
        <div className={cssStyles.Container}>
            <div>
                {products?.map(
                    (item, index) =>
                        item?.id === location.state?.id && (
                            <Cards
                                width={"100%"}
                                height={"100%"}
                                border={"20px"}
                                element={
                                    <div>
                                        {item.imageUrls?.map((i) => (
                                            <div>
                                                <img
                                                    src={`http://localhost:5130${i}`}
                                                />
                                            </div>
                                        ))}

                                        <InputSwitch
                                            checked={item.inStock}
                                            disabled
                                        />
                                    </div>
                                }
                            />
                        )
                )}
            </div>
        </div>
    );
};

export default ProductPage;
