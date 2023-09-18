import React from "react";
import cssStyles from './Menu.module.scss'
import { Icons } from "../Icons/Icons";
import { NavLink } from "react-router-dom";

const Menu = () => {
    console.log(Icons)
    return (
        <div className={cssStyles.MenuContainer}>
            <ul className={cssStyles.MenuUl}>
                {Icons.map((item,index) =>(
                <NavLink 
                    to={item.links}
                   
                    className={({isActive}) => !isActive ? cssStyles.Navlink : cssStyles.NavLinkActive}
                    key={index}
                >
                    <li className={cssStyles.MenuLi}>
                        {item.svg}
                        <span>{item.name}</span>
                    </li>
                </NavLink>
                ))}
                
            </ul>
        </div>
    )
}

export default Menu