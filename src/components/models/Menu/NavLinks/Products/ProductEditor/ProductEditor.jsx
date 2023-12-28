import React, { useState } from "react";
import cssStyles from "./ProductEditor.module.scss";
import "./ProductEditor.module.scss";
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

const ProductEditor = ({ addNewProduct }) => {
    const { productCreateApi } = useRequestDataProvider();
    const [selectedImages, setSelectedImages] = useState([]);
    const [publishShow, setPublishShow] = useState(false);
    const [productCreate, setProductCreate] = useState({
        UserId: "1",
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
    const navigate = useNavigate();

    const backButton = () => {};
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
        e.preventDefault();

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
    };
    const handlePublishChange = (e) => {
        setProductCreate((prevState) => ({
            ...prevState,
            ProductPublish: e.value.code,
        }));
    };
    const handlePublishClick = () => {
        setPublishShow(!publishShow);
    };
    const handleDescriptionChange = (e) => {
        setProductCreate((prevState) => ({
            ...prevState,
            ProductDescription: e.htmlValue,
        }));
    };
    const handleTagsChange = (e) => {
        setProductCreate({
            ...productCreate,
            ProductTags: e.value.code,
        });
    };
    const handleCategoryChange = (e) => {
        setProductCreate({
            ...productCreate,
            ProductCategory: e.value.code,
        });
    };
    console.log(productCreate);
    return (
        <div className={cssStyles.Container}>
            <div>
                <Cards
                    width={"100%"}
                    height={"100%"}
                    border={"20px"}
                    element={
                        <form
                            onSubmit={postProduct}
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
                                        value={productCreate.ProductName}
                                        onChange={(e) =>
                                            setProductCreate({
                                                ...productCreate,
                                                ProductName: e.target.value,
                                            })
                                        }
                                    />
                                    <label htmlFor="Product Name">
                                        Product Name
                                    </label>
                                </span>
                                <div className={cssStyles.ProductStatusInput}>
                                    <span className="p-float-label">
                                        <InputText
                                            value={productCreate.ProductPrice}
                                            onChange={(e) =>
                                                setProductCreate({
                                                    ...productCreate,
                                                    ProductPrice:
                                                        e.target.value,
                                                })
                                            }
                                            keyfilter={"money"}
                                            className="p-invalid"
                                        />
                                        <label htmlFor="Product Price">
                                            Product Price
                                        </label>
                                    </span>

                                    <span className="p-float-label">
                                        <InputText
                                            value={productCreate.ProductCode}
                                            onChange={(e) =>
                                                setProductCreate({
                                                    ...productCreate,
                                                    ProductCode: e.target.value,
                                                })
                                            }
                                        />
                                        <label htmlFor="Product Code">
                                            Product Code
                                        </label>
                                    </span>

                                    <span className="p-float-label">
                                        <InputText
                                            value={productCreate.ProductSKU}
                                            onChange={(e) =>
                                                setProductCreate({
                                                    ...productCreate,
                                                    ProductSKU: e.target.value,
                                                })
                                            }
                                        />
                                        <label htmlFor="Product SKU">
                                            Product SKU
                                        </label>
                                    </span>
                                </div>
                                <Editor
                                    style={{ height: "400px" }}
                                    headerTemplate={header}
                                    className={cssStyles.ProductEditor}
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
                                    />
                                </div>
                            </div>
                            <div className={cssStyles.ProductEditorInputsBlock}>
                                <div className={cssStyles.ProductEditorPanels}>
                                    <Panel header="Publish">
                                        <div className={cssStyles.StatusBlock}>
                                            <div>
                                                <span>Status:</span>
                                                {publishShow ? (
                                                    <Dropdown
                                                        value={productPublish.find(
                                                            (publish) =>
                                                                publish.code ===
                                                                productCreate.ProductPublish
                                                        )}
                                                        onChange={
                                                            handlePublishChange
                                                        }
                                                        options={productPublish}
                                                        optionLabel="name"
                                                        placeholder="Select tags"
                                                    />
                                                ) : (
                                                    <span>
                                                        {
                                                            productPublish.find(
                                                                (publish) =>
                                                                    publish.code ===
                                                                    productCreate.ProductPublish
                                                            )?.name
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                            <div
                                                className={
                                                    cssStyles.HandleClickButton
                                                }
                                                onClick={handlePublishClick}
                                            >
                                                {buttonIcons[13].icon}
                                            </div>
                                        </div>
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
                                        label={"Save"}
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

export default ProductEditor;
