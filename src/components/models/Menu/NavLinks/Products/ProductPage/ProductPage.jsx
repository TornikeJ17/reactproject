import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import cssStyles from "../ProductCreate/ProductCreate.module.scss";
import Cards from "../../../../Widgets/Cards/Cards";
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
        const decodedProductName = decodeURIComponent(productName);
        const product = products.find(
            (p) => p.productName === decodedProductName
        );
        if (product) {
            // Format the image URLs for the Galleria component
            const formattedImages = product.imageUrls.map((url) => ({
                original: `http://localhost:5130${url}`,
                thumbnail: `http://localhost:5130${url}`,
                alt: "Product Image",
            }));
            setImages(formattedImages);
        }
    }, [products, productName, navigate]);
    const ItemTemplate = (item) => {
        console.log("item", item);
        return <Image src={item.original} alt={item.alt} width="250" />;
    };
    const thumbnailTemplate = (item) => {
        return (
            <Image src={item.thumbnail} alt={item.alt} width="80" height="60" />
        );
    };
    const responsiveOptions = [
        {
            breakpoint: "991px",
            numVisible: 4,
        },
        {
            breakpoint: "767px",
            numVisible: 3,
        },
        {
            breakpoint: "575px",
            numVisible: 1,
        },
    ];
    const product = products?.find(
        (p) => p.productName === decodeURIComponent(productName)
    );
    return (
        <div className={cssStyles.Container}>
            <div>
                {product && (
                    <Cards
                        width={"100%"}
                        height={"100%"}
                        border={"20px"}
                        element={
                            <div>
                                <Galleria
                                    value={images}
                                    item={ItemTemplate}
                                    thumbnail={thumbnailTemplate}
                                    style={{ maxWidth: "640px" }}
                                    showThumbnails={true}
                                    numVisible={3}
                                    thumbnailsPosition="bottom"
                                    responsiveOptions={responsiveOptions}
                                />
                                <InputSwitch
                                    checked={product.inStock}
                                    disabled
                                />
                            </div>
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default ProductPage;
