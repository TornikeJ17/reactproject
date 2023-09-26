import React, { useState } from "react";
import cssStyles from "./ProductEditor.module.scss";
import "./ProductEditor.module.scss";
import Cards from "../../../../Widgets/Cards/Cards";
import Label from "../../../../Widgets/Label/Label";
import Images from "../../../../Widgets/Images/Images";
import { buttonIcons } from "../../../../Icons/Icons";
import { Input, Textarea } from "../../../../Widgets/Input/Input";
import { Link } from "react-router-dom";
import Button from "../../../../Widgets/Button/Button";
import Radio from "../../../../Widgets/Radio/Radio";

const ProductEditor = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const  radioItems = [
        {
            id: 0,
            name: "https://shop-point.merku.love/assets/mc-8847c9c4.svg",
        },
        {
            id: 1,
            name: "https://shop-point.merku.love/assets/visa-b8e4f9fc.svg",
        }
    ]

    const handleImageChange = (e, index) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImages((prev) => ({
                    ...prev,
                    [index]: e.target.result,
                }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
const handleImageRemove = (index) => {
    setSelectedImages((prev) => ({
        ...prev,
        [index]: null,
    }));
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
    console.log(selectedImages)
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
                                        {renderImageBlock(2)}
                                        {renderImageBlock(3)}
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
                                <Label title={"Payment Methods"} />
                                <Radio radioItem={radioItems} />
                                
                            </div>
                            <div>
                                <Button />
                                <Button />
                            </div>
                        </div>
                    }
                />
            </div>
        </div>
    );
};

export default ProductEditor;
