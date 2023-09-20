import React, { useState } from "react";
import cssStyles from "./ProductEditor.module.scss";
import "./ProductEditor.module.scss";
import Cards from "../../../../Widgets/Cards/Cards";
import Label from "../../../../Widgets/Label/Label";
import Images from "../../../../Widgets/Images/Images";
import { buttonIcons } from "../../../../Icons/Icons";
import { Input, Textarea } from "../../../../Widgets/Input/Input";
import { Link } from "react-router-dom";

const ProductEditor = () => {
    const [selectImage, setSelectImage] = useState({});

    const handleImageChange = (e, index) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectImage((prev) => ({
                    ...prev,
                    [index]: e.target.result,
                }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    const renderImageBlock = (index) => (
        <div className={cssStyles.ImagesBlock}>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
                style={{ display: "none" }}
                ref={(input) => input && input.click()}
            />
            {selectImage ? (
                <img
                    className={cssStyles.imgProduct}
                    src={selectImage}
                    alt="Selected"
                />
            ) : (
                <Images icon={buttonIcons[3].icon} />
            )}
        </div>
    );
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
                        <div className={cssStyles.ProductEditorContainer}>
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
                                        <div>{renderImageBlock(2)}</div>
                                        <div>{renderImageBlock(3)}</div>
                                    </div>
                                </div>
                                <Label title={"Description"} />
                                <Textarea />
                            </div>
                            <div className={cssStyles.ProductEditorInputsBlock}>
                                <Label title={"Product Name"} />
                                <Input />
                                <Label title={"Category"} />
                                <Input />
                                <Label title={"Price"} />
                                <Input />
                                <Label title={"SKU"} />
                                <Input />
                                <Label title={"Product Name"} />
                                <Input />
                            </div>
                        </div>
                    }
                />
            </div>
        </div>
    );
};

export default ProductEditor;
