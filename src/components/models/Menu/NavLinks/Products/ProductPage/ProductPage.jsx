import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {ordersItems} from "../../../../../api/order";
import cssStyles from "../ProductEditor/ProductEditor.module.scss";
import Cards from "../../../../Widgets/Cards/Cards";
import {buttonIcons, radioItems} from "../../../../Icons/Icons";
import Label from "../../../../Widgets/Label/Label";
import {Input, Textarea} from "../../../../Widgets/Input/Input";
import Radio from "../../../../Widgets/Radio/Radio";
import Button from "../../../../Widgets/Button/Button";
import Images from "../../../../Widgets/Images/Images";
import {productCreateApi} from "../../../../../api/api";
import {CCarousel ,CCarouselItem,CImage } from "@coreui/react"
import '@coreui/coreui/dist/css/coreui.min.css'
const ProductPage = ({products}) => {
    const location = useLocation();
    console.log(products)
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
    console.log(products)
    return(
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
                {products.map((item, index) => item.productId === location.state.productId && (
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
                                            <CCarousel  transition="crossfade">
                                            {item.imagePaths?.map((image) =>
                                                <CCarouselItem>
                                                <CImage style={{
                                                    width: "400px",
                                                }}  src={`http://localhost:5279${image.slice(7)}`}  />
                                                </CCarouselItem>
                                            )}
                                            </CCarousel>
                                        </div>
                                    <Label title={"Description"} />
                                    <div>{item.description}</div>
                                </div>
                                <div className={cssStyles.ProductEditorInputsBlock}>
                                    <Label title={"Product Name"} />
                                    <div>{item.productName}</div>
                                    <Label title={"Category"} />
                                    <div>{item.category}</div>
                                    <Label title={"Price"} />
                                    <div>{item.price}$</div>
                                    <Label title={"SKU"} />
                                    <div>{item.sku}</div>
                                    <Label title={"Stock Status"} />
                                    <div>{item.stockStatus}</div>
                                    <Label title={"Payment Methods"} />
                                    <Radio radioItem={radioItems} value={item.payment} />
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
                ))}
            </div>
        </div>
    )
}

export default ProductPage