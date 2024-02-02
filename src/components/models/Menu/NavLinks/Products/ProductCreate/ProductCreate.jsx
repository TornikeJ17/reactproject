import React, { useRef, useState } from "react";
import cssStyles from "./ProductCreate.module.scss";
import Cards from "../../../../Widgets/Cards/Cards";
import Images from "../../../../Widgets/Images/Images";
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

const ProductCreate = ({ addNewProduct, user }) => {
    const { productCreateApi } = useRequestDataProvider();
    const toastTopRight = useRef(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [publishShow, setPublishShow] = useState(false);
    console.log(user, "userrrrrrr");
    const [productCreate, setProductCreate] = useState({
        UserId: user.id,
        Id: "",
        ProductName: "",
        ProductPrice: "",
        ProductCode: "",
        ProductSKU: "",
        ProductDescription: null,
        ProductPublish: null,
        ProductTags: null,
        ProductCategory: null,
        inStock: false,
        ImageUrls: [],
    });
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

    const postProduct = async (e) => {
        const formData = new FormData();

        formData.append("UserId", productCreate.UserId);
        formData.append("ProductName", productCreate.ProductName);
        formData.append("ProductPrice", productCreate.ProductPrice);
        formData.append("ProductCode", productCreate.ProductCode);
        formData.append("ProductSKU", productCreate.ProductSKU);
        formData.append("ProductDescription", productCreate.ProductDescription);
        formData.append("ProductPublish", productCreate.ProductPublish);
        formData.append(
            "ProductTags",
            JSON.stringify(productCreate.ProductTags)
        );
        formData.append("ProductCategory", productCreate.ProductCategory);
        formData.append("inStock", productCreate.inStock);
        formData.append(
            "ImageUrls",
            selectedImages.forEach((file) => {
                if (file) {
                    formData.append("imageFiles", file);
                }
            })
        );

        try {
            const response = await productCreateApi(formData);
            addNewProduct(response.data);
            navigate("/products");
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };
    const showValidationError = (fieldName) => {
        const messages = {
            ProductName: "Product name is required.",
            ProductPrice: "Product price is required.",
            ProductCode: "Product code is required.",
            ProductSKU: "Product SKU is required.",
            ProductDescription: "Product description is required.",
            ProductPublish: "Product publish status is required.",
            ProductTags: "Product tags are required.",
            ProductCategory: "Product category is required.",
            ImageUrls: "At least one product image is required.",
        };

        showMessage(toastTopRight, "error", "Error", messages[fieldName]);
    };
    const validateFields = () => {
        const errors = {
            ProductName: !productCreate.ProductName,
            ProductPrice: !productCreate.ProductPrice,
            ProductCode: !productCreate.ProductCode,
            ProductSKU: !productCreate.ProductSKU,
            ProductDescription: !productCreate.ProductDescription,
            ProductPublish: productCreate.ProductPublish == null,
            ProductTags: productCreate.ProductTags == null,
            ProductCategory: productCreate.ProductCategory == null,
            ImageUrls: selectedImages.length === 0,
        };

        setValidationErrors(errors);
        return !Object.values(errors).includes(true);
    };

    const showMessage = (ref, severity, summary, detail) => {
        ref.current.show({
            severity: severity,
            summary: summary,
            detail: detail,
            life: 3000,
        });
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

    const renderHeader = () => {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button
                    className="ql-underline"
                    aria-label="Underline"
                ></button>
            </span>
        );
    };
    const header = renderHeader();

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
    const handlePublishClick = () => {
        setPublishShow(!publishShow);
        setValidationErrors((prev) => {
            return {
                ...prev,
                ProductPublish: productCreate.ProductPublish === null,
            };
        });
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
        setValidationErrors((prev) => {
            return {
                ...prev,
                ProductCategory: productCreate.ProductCategory === null,
            };
        });
    };
    console.log("productCreate", productCreate);
    return (
        <div className={cssStyles.Container}>
            <Toast ref={toastTopRight} position="top-right"></Toast>

            <div>
                <Cards
                    width={"100%"}
                    height={"100%"}
                    border={"20px"}
                    element={
                        <form
                            onSubmit={createFunction}
                            className={cssStyles.ProductEditorContainer}
                        >
                            <div className={cssStyles.ProductEditorTitle}>
                                Create Product
                            </div>
                            <div className={cssStyles.BackButton}>
                                <Link to={"/products"}>
                                    {buttonIcons[14].icon}
                                </Link>
                            </div>
                            <div className={cssStyles.firstBlockGrid}>
                                <span className="p-float-label">
                                    <InputText
                                        onChange={(e) => {
                                            setProductCreate({
                                                ...productCreate,
                                                ProductName: e.target.value,
                                            });
                                            setValidationErrors((prev) => ({
                                                ...prev,
                                                ProductName: false,
                                            }));
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
                                                    ProductPrice:
                                                        e.target.value,
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
                                    style={{ height: "400px" }}
                                    headerTemplate={header}
                                    className={
                                        validationErrors.ProductPrice
                                            ? "p-invalid"
                                            : ""
                                    }
                                    value={productCreate.ProductDescription}
                                    onTextChange={handleDescriptionChange}
                                />

                                <div className="card">
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
                                                Drag and drop files here to
                                                upload.
                                            </p>
                                        }
                                        className={
                                            validationErrors.ProductPrice
                                                ? "p-invalid"
                                                : ""
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
                                    className={
                                        cssStyles.ProductEditorButtonsBlock
                                    }
                                >
                                    <Link
                                        to={"/products"}
                                        className={cssStyles.BackButtonClick}
                                    >
                                        <span>Back</span>
                                    </Link>
                                    <Button
                                        type={"submit"}
                                        label={"Create"}
                                        icon={buttonIcons[11].icon}
                                    />
                                </div>
                            </div>
                        </form>
                    }
                />
            </div>
        </div>
    );
};

export default ProductCreate;
