import React, { useEffect, useRef, useState } from "react";
import cssStyles from "./ProductUpdate.module.scss";
import { Card } from "primereact/card";
import { buttonIcons, radioItems } from "../../../../Icons/Icons";
import { Link, useNavigate } from "react-router-dom";
import useRequestDataProvider from "../../../../../api/useRequestDataProvider";
import { Editor } from "primereact/editor";
import { FileUpload } from "primereact/fileupload";
import { Panel } from "primereact/panel";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { Image } from "primereact/image";
import { Badge } from "primereact/badge";

const ProductUpdate = ({ updateProduct, user, getProductId }) => {
    const { productUpdateApi } = useRequestDataProvider();
    const toastTopRight = useRef(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [publishShow, setPublishShow] = useState(false);
    const [productCreate, setProductCreate] = useState({});
    const [existingImages, setExistingImages] = useState([]);

    const [validationErrors, setValidationErrors] = useState({
        ProductName: false,
        ProductPrice: false,
        ProductCode: false,
        ProductSKU: false,
        ProductDescription: false,
        ProductPublish: false,
        ProductTags: false,
        ProductCategory: false,
        ImageUrls: false,
    });
    const navigate = useNavigate();

    //dropdown
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

    const postProduct = async () => {
        const formData = buildFormData();

        try {
            const updatedProduct = await productUpdateApi(
                productCreate.Id,
                formData
            );
            updateProduct(updatedProduct);
            navigate("/products");
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };
    const buildFormData = () => {
        const formData = new FormData();
        Object.entries(productCreate).forEach(([key, value]) => {
            formData.append(key, value);
        });
        selectedImages.forEach((file) => {
            formData.append("imageFiles", file);
        });
        return formData;
    };

    const showValidationError = (fieldName) => {
        const messages = {
            ProductName: "Product name is required.",
            ProductPrice: "Product price is required.",
            ProductCode: "Product code is required.",
            ProductSKU: "Product SKU is required.",
            ProductPublish: "Product publish status is required.",
            ProductTags: "Product tags are required.",
            ProductCategory: "Product category is required.",
        };
    };
    const validateFields = () => {
        const errors = {
            ProductName: !productCreate.ProductName,
            ProductPrice: !productCreate.ProductPrice,
            ProductCode: !productCreate.ProductCode,
            ProductSKU: !productCreate.ProductSKU,
            ProductPublish: productCreate.ProductPublish == null,
            ProductTags: productCreate.ProductTags == null,
            ProductCategory: productCreate.ProductCategory == null,
        };

        setValidationErrors(errors);
        return !Object.values(errors).includes(true);
    };

    const createFunction = (e) => {
        e.preventDefault();

        toastTopRight.current.clear();
        const isValid = validateFields();
        if (!isValid) {
            Object.entries(validationErrors).forEach(([field, error]) => {
                if (error) {
                    showValidationError(field);
                }
            });
            return;
        }
        postProduct();
    };

    const handleUpload = (event) => {
        setSelectedImages(event.files);
        setValidationErrors((prev) => {
            return {
                ...prev,
                ImageUrls: selectedImages.length === 0,
            };
        });
    };
    const handlePublishChange = (e) => {
        setProductCreate((prevState) => ({
            ...prevState,
            ProductPublish: e.value.code,
        }));
    };

    const handleDescriptionChange = (e) => {
        setProductCreate((prevState) => ({
            ...prevState,
            ProductDescription: e.htmlValue,
        }));
        setValidationErrors((prev) => {
            return {
                ...prev,
                ProductDescription: !productCreate.ProductDescription,
            };
        });
    };
    const handleTagsChange = (e) => {
        setProductCreate({
            ...productCreate,
            ProductTags: e.value.code,
        });
        setValidationErrors((prev) => {
            return {
                ...prev,
                ProductTags: productCreate.ProductTags === null,
            };
        });
    };
    const handleCategoryChange = (e) => {
        setProductCreate({
            ...productCreate,
            ProductCategory: e.value.code,
        });
    };
    useEffect(() => {
        if (getProductId?.imageUrls) {
            setExistingImages(getProductId.imageUrls); // Set the initial state with existing images
        }

        setProductCreate({
            UserId: user.id,
            Id: getProductId?.id,
            ProductName: getProductId?.productName,
            ProductPrice: getProductId?.productPrice,
            ProductCode: getProductId?.productCode,
            ProductSKU: getProductId?.productSKU,
            ProductDescription: getProductId?.productDescription,
            ProductPublish: getProductId?.productPublish,
            ProductTags: getProductId?.productTags,
            ProductCategory: getProductId?.productCategory,
            inStock: getProductId?.inStock,
            ImageUrls: getProductId?.imageUrls,
        });
    }, [getProductId, productCreate.ImageUrls]);

    const removeExistingImage = (imageToRemove) => {
        setExistingImages(
            existingImages.filter((image) => image !== imageToRemove)
        );
    };
    const imageList = (
        <div className={cssStyles.ImageList}>
            {existingImages.map((imageUrl, index) => (
                <div>
                    <Image
                        src={"https://3522.somee.com" + imageUrl}
                        alt={`Product Image ${index}`}
                        className={cssStyles.ProductImage}
                    />

                    <Badge
                        size="normal"
                        severity="danger"
                        value={buttonIcons[25].icon}
                        onClick={() => removeExistingImage(imageUrl)}
                    />
                </div>
            ))}
        </div>
    );

    return (
        <div className={cssStyles.Container}>
            <Toast ref={toastTopRight} position="top-right"></Toast>

            <div>
                <Card>
                    <div className={cssStyles.TitleCreateProduct}>
                        <div className={cssStyles.ProductEditorTitle}>
                            Update Product
                        </div>
                        <div className={cssStyles.BackButton}>
                            <Link to={"/products"}>{buttonIcons[14].icon}</Link>
                        </div>
                    </div>
                    <form
                        onSubmit={createFunction}
                        className={cssStyles.ProductEditorContainer}
                    >
                        <div className={cssStyles.firstBlockGrid}>
                            <span className="p-float-label">
                                <InputText
                                    value={productCreate.ProductName}
                                    onChange={(e) => {
                                        setProductCreate({
                                            ...productCreate,
                                            ProductName: e.target.value,
                                        });
                                    }}
                                    className={
                                        validationErrors.ProductName
                                            ? "p-invalid"
                                            : ""
                                    }
                                />
                                <label htmlFor="Product Name">
                                    Product Name
                                </label>
                                <div style={{ position: "absolute" }}>
                                    {validationErrors.ProductName && (
                                        <small className="p-error">
                                            Product Name is required.
                                        </small>
                                    )}
                                </div>
                            </span>
                            <div className={cssStyles.ProductStatusInput}>
                                <span className="p-float-label">
                                    <InputText
                                        value={productCreate.ProductPrice}
                                        onChange={(e) => {
                                            setProductCreate({
                                                ...productCreate,
                                                ProductPrice: e.target.value,
                                            });
                                            setValidationErrors((prev) => ({
                                                ...prev,
                                                ProductPrice: false,
                                            }));
                                        }}
                                        keyfilter={"money"}
                                        className={
                                            validationErrors.ProductPrice
                                                ? "p-invalid"
                                                : ""
                                        }
                                    />
                                    <label htmlFor="Product Price">
                                        Product Price
                                    </label>
                                    <div style={{ position: "absolute" }}>
                                        {validationErrors.ProductPrice && (
                                            <small className="p-error">
                                                Product Price is required.
                                            </small>
                                        )}
                                    </div>
                                </span>

                                <span className="p-float-label">
                                    <InputText
                                        value={productCreate.ProductCode}
                                        onChange={(e) => {
                                            setProductCreate({
                                                ...productCreate,
                                                ProductCode: e.target.value,
                                            });
                                            setValidationErrors((prev) => ({
                                                ...prev,
                                                ProductCode: false,
                                            }));
                                        }}
                                        className={
                                            validationErrors.ProductCode
                                                ? "p-invalid"
                                                : ""
                                        }
                                    />
                                    <label htmlFor="Product Code">
                                        Product Code
                                    </label>
                                    <div style={{ position: "absolute" }}>
                                        {validationErrors.ProductCode && (
                                            <small className="p-error">
                                                Product Code is required.
                                            </small>
                                        )}
                                    </div>
                                </span>

                                <span className="p-float-label">
                                    <InputText
                                        value={productCreate.ProductSKU}
                                        onChange={(e) => {
                                            setProductCreate({
                                                ...productCreate,
                                                ProductSKU: e.target.value,
                                            });
                                            setValidationErrors((prev) => ({
                                                ...prev,
                                                ProductSKU: false,
                                            }));
                                        }}
                                        className={
                                            validationErrors.ProductSKU
                                                ? "p-invalid"
                                                : ""
                                        }
                                    />
                                    <label htmlFor="Product SKU">
                                        Product SKU
                                    </label>
                                    <div style={{ position: "absolute" }}>
                                        {validationErrors.ProductSKU && (
                                            <small className="p-error">
                                                Product SKU is required.
                                            </small>
                                        )}
                                    </div>
                                </span>
                            </div>

                            <Editor
                                style={{ height: "290px" }}
                                value={productCreate.ProductDescription}
                                onTextChange={handleDescriptionChange}
                            />

                            <div className="card">
                                {existingImages.length > 0 && (
                                    <Card>{imageList}</Card>
                                )}
                                <FileUpload
                                    name="imageFiles"
                                    customUpload={true}
                                    auto={false}
                                    onSelect={handleUpload}
                                    multiple
                                    accept="image/*"
                                    maxFileSize={5000000}
                                    emptyTemplate={
                                        <p className="m-0">
                                            Drag and drop files here to upload.
                                        </p>
                                    }
                                />
                            </div>
                        </div>
                        <div className={cssStyles.ProductEditorInputsBlock}>
                            <div className={cssStyles.ProductEditorPanels}>
                                <Panel header="Status">
                                    <Dropdown
                                        value={productPublish.find(
                                            (publish) =>
                                                publish.code ===
                                                productCreate.ProductPublish
                                        )}
                                        onChange={handlePublishChange}
                                        options={productPublish}
                                        optionLabel="name"
                                        placeholder="Select status"
                                        className={
                                            validationErrors.ProductTags
                                                ? "p-invalid"
                                                : ""
                                        }
                                    />
                                </Panel>
                                <Panel header="Tags">
                                    <Dropdown
                                        value={productTagsDropdown.find(
                                            (tags) =>
                                                tags.code ===
                                                productCreate.ProductTags
                                        )}
                                        onChange={handleTagsChange}
                                        options={productTagsDropdown}
                                        optionLabel="name"
                                        placeholder="Select tags"
                                        className={
                                            validationErrors.ProductTags
                                                ? "p-invalid"
                                                : ""
                                        }
                                    />
                                </Panel>
                                <Panel header="Cagegory" className="w-full">
                                    <Dropdown
                                        value={productCategoryDropdown.find(
                                            (category) =>
                                                category.code ===
                                                productCreate.ProductCategory
                                        )}
                                        onChange={handleCategoryChange}
                                        options={productCategoryDropdown}
                                        optionLabel="name"
                                        placeholder="Select category"
                                        className={
                                            validationErrors.ProductCategory
                                                ? "p-invalid"
                                                : ""
                                        }
                                    />
                                </Panel>
                                <Panel
                                    className={cssStyles.PanelInStock}
                                    unstyled
                                >
                                    <p className={cssStyles.inStockFont}>
                                        in stock
                                    </p>
                                    <InputSwitch
                                        checked={productCreate.inStock}
                                        onChange={(e) =>
                                            setProductCreate({
                                                ...productCreate,
                                                inStock: e.value,
                                            })
                                        }
                                    />
                                </Panel>
                            </div>
                            <div
                                className={cssStyles.ProductEditorButtonsBlock}
                            >
                                <Link
                                    to={"/products"}
                                    className={cssStyles.BackButtonClick}
                                >
                                    <span>Back</span>
                                </Link>
                                <Button
                                    type={"submit"}
                                    label={"Update"}
                                    icon={buttonIcons[24].icon}
                                    severity="warning"
                                />
                            </div>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default ProductUpdate;
