import React from "react";
import cssStyles from './Menu.module.scss'
import { Icons } from "../Icons/Icons";
import { Link } from "react-router-dom";

const Menu = () => {
    console.log(Icons)
    return (
        <div className={cssStyles.MenuContainer}>
            <ul className={cssStyles.MenuUl}>
                {Icons.map(item =>(
                <Link to={item.links}>
                    <li className={cssStyles.MenuLi}>
                        {item.svg}
                        <span>{item.name}</span>
                    </li>
                </Link>
                ))}
                
            </ul>
        </div>
    )
}

export default Menu