import React from "react";
import cssStyles from './ProductEditor.module.scss'
import "./ProductEditor.module.scss"
import Cards from "../../../../Widgets/Cards/Cards";
import Label from "../../../../Widgets/Label/Label";
import Images from "../../../../Widgets/Images/Images";
import {buttonIcons} from "../../../../Icons/Icons";
import Input from "../../../../Widgets/Input/Input";


const ProductEditor = () => {
    return(
        <div className={cssStyles.Container}>
            <div>
                <Cards 
                    width={"10%"}
                    height={"44px"}
                    element={<div className={cssStyles.ProductsTitle}>Product Editor</div>}
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
                        <div className={cssStyles.ProductEditorTitle}>Product Settings</div>
                        <div>
                        </div>
                        <div className={cssStyles.firstBlockGrid}>
                           <Label 
                               title={"Product Images"}
                           />
                            <div className={cssStyles.ImagesContainer}>
                                <div className={cssStyles.ImagesBlock}>
                                    <Images icon={buttonIcons[3].icon}/>
                                </div>
                                <div className={cssStyles.ImagesBlock}>
                                    <Images icon={buttonIcons[3].icon}/>
                                </div>
                                <div className={cssStyles.ImagesBlockSmall}>
                                    <div>
                                        <Images icon={buttonIcons[3].icon}/>
                                    </div>
                                    <div>
                                        <Images icon={buttonIcons[3].icon}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                          <Label title={"Product Name"} />
                            <Input />
                            <Label title={"Product Name"} />
                            <Input />
                            <Label title={"Product Name"} />
                            <Input />
                            <Label title={"Product Name"} />
                            <Input />
                            <Label title={"Product Name"} />
                           <Input />
                        </div>
                    </div>
                    }
                />
            </div>
        </div>
    )
}

export default ProductEditor 