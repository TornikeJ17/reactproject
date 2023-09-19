import React from "react";
import Cards from "../../../Widgets/Cards/Cards";
import {ordersItems} from "../../../../api/order";
import cssStyles from './Products.module.scss'
import Button from "../../../Widgets/Button/Button";
import {buttonIcons} from "../../../Icons/Icons";

const Products = () => {
    return (
        <div className={cssStyles.Container}>
            <Cards 
                width={"10%"}
                border={"10px"}
                element={<div className={cssStyles.ProductsTitle}>Products</div>}
            />
          <div className={cssStyles.ProductItemContainer}>
              {ordersItems.map(item => (
                  <Cards
                      key={item.id}
                      width={"100%"}
                      height={"250px"}
                      border={"20px"}
                      element={
                          <div className={cssStyles.OrderElementBlock}>
                           <div>
                               <img src={item.icon} style={{
                                   width: "130px",
                                   height:"100px",
                                   aspectRatio: "1/1",
                                   objectFit: "contain",


                               }} alt={"s"}/>
                           </div>
                              <div className={cssStyles.OrderElementTitle}>
                                  {item.name}
                              </div>
                              <div className={cssStyles.OrderElementText}>
                                  ${item.price}
                              </div>
                              <div className={cssStyles.ProductsButtonsContainer}>
                                  <Button 
                                      icon={buttonIcons[0].icon}
                                      background={
                                          "#2F00FF"
                                      }
                                      width={"50px"}
                                  />
                                  <Button
                                      icon={buttonIcons[1].icon}
                                      background={
                                          "#FF3E3E"
                                      }
                                      width={"50px"}
                                  />
                              </div>
                          </div>
                          
                      }
                  />
              ))}
          </div>
        </div>
    )
}

export default Products