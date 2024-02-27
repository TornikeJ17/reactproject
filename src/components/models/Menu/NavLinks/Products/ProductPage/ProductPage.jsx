import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import cssStyles from "../ProductPage/ProductPage.module.scss";
import { Card } from "primereact/card";
import { buttonIcons } from "../../../../Icons/Icons";
import { Galleria } from "primereact/galleria";
import { Image } from "primereact/image";
import { Tooltip } from "primereact/tooltip";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
const ProductPage = ({ products, productDelete, getProductById }) => {
    const [images, setImages] = useState([]);

    const { productName } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (product) {
            const formattedImages = product.imageUrls.map((url) => [
                `https://3522.somee.com${url}`,
            ]);
            // const formattedImages = product.imageUrls.map((url) => [
            //     `https://localhost:7225${url}`,
            // ]);
            setImages(formattedImages);
        }
    }, [products, productName, navigate]);
    const navigateBack = () => {
        if (location.state && location.state.pageIndex) {
            navigate("/products", {
                state: { pageIndex: location.state.pageIndex },
            });
        } else {
            navigate(-1);
        }
    };
    const productPublish = [
        { name: "Draft", code: 0 },
        { name: "Published", code: 1 },
    ];
    const productTagsDropdown = [
        { name: "New", code: 0 },
        { name: "Trending", code: 1 },
        { name: "Sale", code: 2 },
        { name: "Discounted", code: 3 },
    ];
    const productCategoryDropdown = [
        { name: "Rings", code: 0 },
        { name: "Earrings", code: 1 },
        { name: "Necklaces", code: 2 },
        { name: "Bracelets", code: 3 },
        { name: "Others", code: 4 },
    ];
    const ItemTemplate = (item) => {
        return <Image className={cssStyles.GalleriaImages} src={item} />;
    };

    const product = products?.find(
        (p) => p.productName === decodeURIComponent(productName)
    );

    const getStatussName = (statusCode) => {
        const status = productPublish.find((s) => s.code === statusCode);
        return status ? status.name : "Unknown Status";
    };
    const getTagsName = (tagsCode) => {
        const tags = productTagsDropdown.find((t) => t.code === tagsCode);
        return tags ? tags.name : "Unknown Tag";
    };
    const getCategoryName = (categoryCode) => {
        const category = productCategoryDropdown.find(
            (c) => c.code === categoryCode
        );
        return category ? category.name : "Unknown Category";
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
            />
        );
    };
    const ProductDescription = ({ value, className }) => {
        // Function to safely truncate HTML text
        const truncateHTML = (htmlContent, length) => {
            // Create a dummy container for the HTML content
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = htmlContent;

            // Function to count text length while safely traversing the HTML tree
            const walkNodes = (node, currentLength) => {
                if (currentLength >= length) return currentLength;
                if (node.nodeType === Node.TEXT_NODE) {
                    return currentLength + node.length;
                }
                if (node.nodeType === Node.ELEMENT_NODE) {
                    for (let child of node.childNodes) {
                        currentLength = walkNodes(child, currentLength);
                        if (currentLength >= length) {
                            // If we've reached the maximum length, break from the loop
                            node.innerHTML = node.innerHTML.substring(
                                0,
                                length - currentLength
                            );
                            break;
                        }
                    }
                    return currentLength;
                }
                return currentLength;
            };

            // Start walking the node tree
            walkNodes(tempDiv, 0);

            return tempDiv.innerHTML;
        };

        // Determine if the tooltip should be shown
        const showTooltip = value && value.length > 400;
        const displayValue = truncateHTML(value, 400);

        return (
            <div className={className}>
                <span dangerouslySetInnerHTML={{ __html: displayValue }} />
                {/* {showTooltip && (
                    <Tooltip target={`.${className} > span`} content={value} />
                )} */}
            </div>
        );
    };
    const DeleteProduct = () => {
        confirmDialog({
            message: (
                <div>
                    Are you sure you want to delete the product{" "}
                    <b>{product?.productName}?</b>
                </div>
            ),

            header: "Delete Product",
            icon: "pi pi-exclamation-triangle",
            defaultFocus: "accept",
            accept: () => {
                productDelete(product?.id);
            },
        });
        <ConfirmDialog />;
    };
    const navigateToEdit = () => {
        navigate(`/products/${product?.productName}/${product?.id}`, {
            state: { product: product },
            getProductById: getProductById(product?.id),
        });
    };
    return (
        <div className={cssStyles.Container}>
            <Tooltip target=".custom-target-icon" />
            {product && (
                <Card
                    className={cssStyles.Card}
                    title={
                        <span onClick={navigateBack}>
                            {buttonIcons[4].icon}
                        </span>
                    }
                    footer={
                        <div>
                            <div className={cssStyles.ProductHeader}>
                                {product.imageUrls.length === 0 ? (
                                    <Image
                                        className={cssStyles.GalleriaImages}
                                        src={
                                            "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                                        }
                                    />
                                ) : (
                                    Images()
                                )}

                                <div className={cssStyles.ProductInfos}>
                                    <div>
                                        <label>Name</label>
                                        <h2>{product?.productName}</h2>
                                        <label>Description</label>
                                        <p
                                            className={`${cssStyles.productDescription} custom-target-icon`}
                                        >
                                            <ProductDescription
                                                value={
                                                    product?.productDescription
                                                }
                                                className="custom-target-icon"
                                                data-pr-tooltip={
                                                    product?.productDescription
                                                }
                                            />
                                        </p>
                                    </div>
                                    <div
                                        className={cssStyles.ProductInfoSecond}
                                    >
                                        <div>
                                            <label>Price</label>
                                            <p
                                                className={
                                                    cssStyles.ProductText
                                                }
                                            >
                                                ${product?.productPrice}
                                            </p>
                                        </div>
                                        <div>
                                            <label>Product Code</label>
                                            <p
                                                className={
                                                    cssStyles.ProductText
                                                }
                                            >
                                                {product?.productCode}
                                            </p>
                                        </div>
                                        <div>
                                            <label>Product SKU</label>
                                            <p
                                                className={
                                                    cssStyles.ProductText
                                                }
                                            >
                                                {product?.productSKU}
                                            </p>
                                        </div>
                                        <div>
                                            <label>Status</label>
                                            <p
                                                className={
                                                    cssStyles.ProductText
                                                }
                                            >
                                                {getStatussName(
                                                    product.productPublish
                                                )}
                                            </p>
                                        </div>
                                        <div>
                                            <label>Tags</label>
                                            <p
                                                className={
                                                    cssStyles.ProductText
                                                }
                                            >
                                                {getTagsName(
                                                    product.productTags
                                                )}
                                            </p>
                                        </div>
                                        <div>
                                            <label>Category</label>
                                            <p
                                                className={
                                                    cssStyles.ProductText
                                                }
                                            >
                                                {getCategoryName(
                                                    product?.productCategory
                                                )}
                                            </p>
                                        </div>
                                        <div>
                                            <label>in Stock</label>
                                            <p
                                                className={
                                                    cssStyles.ProductText
                                                }
                                            >
                                                {product?.inStock
                                                    ? buttonIcons[23].icon
                                                    : buttonIcons[22].icon}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cssStyles.ProductFooter}>
                                <Button
                                    label={"Edit"}
                                    severity="warning"
                                    onClick={() => navigateToEdit()}
                                />
                                <Button
                                    label={"Delete"}
                                    severity="danger"
                                    onClick={() => DeleteProduct()}
                                />
                            </div>
                        </div>
                    }
                />
            )}
        </div>
    );
};

export default ProductPage;
