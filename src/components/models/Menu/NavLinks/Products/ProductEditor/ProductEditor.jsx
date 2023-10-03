import React, { useState } from "react";
import cssStyles from "./ProductEditor.module.scss";
import "./ProductEditor.module.scss";
import Cards from "../../../../Widgets/Cards/Cards";
import Label from "../../../../Widgets/Label/Label";
import Images from "../../../../Widgets/Images/Images";
import {buttonIcons, radioItems} from "../../../../Icons/Icons";
import { Input, Textarea } from "../../../../Widgets/Input/Input";
import { Link } from "react-router-dom";
import Button from "../../../../Widgets/Button/Button";
import Radio from "../../../../Widgets/Radio/Radio";
import {productCreateApi} from "../../../../../api/api";
import axios from "axios";

const ProductEditor = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [productCreate, setProductCreate] = useState({
        ProductName: "",
        Category: "",
        Price: "",
        SKU: "",
        Description: "",
        ImagePaths: [],
        StockPaths: "",
        Payment: ""
    });


    const handleImageChange = (e, index) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImages(prevImages => {
                    const updatedImages = [...prevImages];
                    updatedImages[index] = e.target.result; // For displaying on UI
                    return updatedImages;
                });
            };
            reader.readAsDataURL(file);

            setProductCreate(prev => {
                const updatedData = {...prev};
                updatedData.ImagePaths[index] = file; // Store the file for FormData
                return updatedData;
            });
        }
    };
    const handleImageRemove = (index) => {
        setSelectedImages(prev => {
            const updatedImages = [...prev];
            updatedImages[index] = null;
            return updatedImages;
        });
        setProductCreate(prev => {
            const updatedProductCreate = { ...prev };
            delete updatedProductCreate[`image${index}`];
            return updatedProductCreate;
        });
    }

    const renderImageBlock = (index) => (
        <div className={cssStyles.ImagesBlock}>
            {selectedImages[index] ? (
                <div className={cssStyles.SelectedImageBlock}>
                    <img className={cssStyles.imgProduct} src={selectedImages[index]} alt="Selected" />
                    <span className={cssStyles.removeButtonIMG} onClick={() => handleImageRemove(index)}>{buttonIcons[5].icon}</span>
                </div>
            ) : (
                <Images
                    icon={buttonIcons[3].icon}
                    onChange={(e) => handleImageChange(e, index)}
                    id={`image-input-${index}`}
                />
            )}
        </div>
    );
    const array = []
    array.push([selectedImages])
    const postProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("ProductName", productCreate.ProductName);
        formData.append("Category", productCreate.Category);
        formData.append("Price", productCreate.Price);
        formData.append("SKU", productCreate.SKU);
        formData.append("Description", productCreate.Description);
        formData.append("Image", productCreate.Image);
        formData.append("ImagePaths", productCreate.ImagePaths);
        formData.append("StockStatus", productCreate.StockStatus);
        formData.append("Payment", productCreate.Payment);
        selectedImages.forEach((imageFile, index) => {
            if (imageFile) {
                formData.append(`Image`, imageFile);
            }
        });
        productCreate.ImagePaths.forEach((imageFile, index) => {
            if (imageFile) {
                formData.append(`Image`, imageFile);
            }
        });
        console.log(productCreate.ImagePaths)
        try {
            const response = await productCreateApi(formData);
            return response
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };
    return (
        <div className={cssStyles.Container}>
            <div>
                <Cards
                    width={"10%"}
                    height={"44px"}
                    element={
                        <div className={cssStyles.ProductsTitle}>
                            Product Editor
                        </div>
                    }
                    border={"10px"}
                />
            </div>
            <div>
                <Cards
                    width={"100%"}
                    height={"100%"}
                    border={"20px"}
                    element={
                        <form onSubmit={postProduct} className={cssStyles.ProductEditorContainer}>
                            <div className={cssStyles.ProductEditorTitle}>
                                Product Settings
                            </div>
                            <div className={cssStyles.BackButton}>
                                <Link to={"/products"}>
                                    {buttonIcons[4].icon}
                                    <span>Back</span>
                                </Link>
                            </div>
                            <div className={cssStyles.firstBlockGrid}>
                                <Label title={"Product Images"} />
                                <div className={cssStyles.ImagesContainer}>
                                    <div className={cssStyles.ImagesBlock}>
                                        {renderImageBlock(0)}
                                    </div>
                                    <div className={cssStyles.ImagesBlock}>
                                        {renderImageBlock(1)}
                                    </div>
                                    <div className={cssStyles.ImagesBlockSmall}>
                                        {renderImageBlock(2)}
                                        {renderImageBlock(3)}
                                    </div>
                                </div>
                                <Label title={"Description"} />
                                <Textarea onChange={(e) => setProductCreate({...productCreate, Description: e.target.value})}/>
                            </div>
                            <div className={cssStyles.ProductEditorInputsBlock}>
                                <Label title={"Product Name"} />
                                <Input onChange={(e) => setProductCreate({...productCreate, ProductName: e.target.value})} />
                                <Label title={"Category"} />
                                <Input onChange={(e) => setProductCreate({...productCreate, Category: e.target.value})} />
                                <Label title={"Price"} />
                                <Input onChange={(e) => setProductCreate({...productCreate, Price: e.target.value})} />
                                <Label title={"SKU"} />
                                <Input onChange={ (e) => setProductCreate({...productCreate, SKU: e.target.value})}/>
                                <Label title={"Stock Status"} />
                                <Input onChange={(e) => setProductCreate({...productCreate, StockStatus: e.target.value})}/>
                                <Label title={"Payment Methods"} />
                                <Radio radioItem={radioItems} onChange={(e) => setProductCreate({...productCreate, Payment: e.target.value})}/>
                                <div className={cssStyles.ProductEditorButtonsBlock}>
                                    <Button
                                        title={"Save to Drafts"}
                                        width={"30%"}
                                        primary={false}
                                        background={"rgb(176, 176, 176)"}
                                    />
                                    <Button
                                        type={"submit"}
                                        title={"Publish Product"}
                                        width={"30%"}
                                        primary={false}
                                        background={"rgb(0, 186, 157)"}
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
