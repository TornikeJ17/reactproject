import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import cssStyles from "../ProductPage/ProductPage.module.scss";
import { Card } from "primereact/card";
import { buttonIcons, radioItems } from "../../../../Icons/Icons";
import useRequestDataProvider from "../../../../../api/useRequestDataProvider";
import { Galleria } from "primereact/galleria";
import { InputSwitch } from "primereact/inputswitch";
import { Image } from "primereact/image";
const ProductPage = ({ products }) => {
    const [images, setImages] = useState([]);
    const { productDelete } = useRequestDataProvider();
    const { productName } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
            // Format the image URLs for the Galleria component
            const formattedImages = product.imageUrls.map((url) => ({
                original: `https://3522.somee.com${url}`,
                thumbnail: `https://l3522.somee.com${url}`,
                alt: "Product Image",
            }));
            setImages(formattedImages);
        }
    }, [products, productName, navigate]);
    const ItemTemplate = (item) => {
        return (
            <Image
                className={cssStyles.GalleriaImages}
                src={item.original}
                alt={item.alt}
            />
        );
    };

    const product = products?.find(
        (p) => p.productName === decodeURIComponent(productName)
    );
    const indicatorTemplate = (index) => {
        return (
            <span
                style={{
                    color: "#ffffff",
                    cursor: "pointer",
                    fontSize: "24px",
                }}
            >
                {index + 1}
            </span>
        );
    };
    const Images = () => {
        return (
            <Galleria
                value={images}
                style={{ maxWidth: "600px" }}
                className="custom-indicator-galleria"
                showThumbnails={false}
                showIndicators
                changeItemOnIndicatorHover
                showIndicatorsOnItem
                indicatorsPosition="left"
                item={ItemTemplate}
                indicator={indicatorTemplate}
            />
        );
    };
    return (
        <div className={cssStyles.Container}>
            <div>
                {product && (
                    <Card
                        title={product.productName}
                        className={cssStyles.Card}
                        footer={
                            <div>
                                {Images()}
                                {console.log(product)}
                            </div>
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default ProductPage;
