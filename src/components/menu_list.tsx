import React, {useState} from "react";
import '../resources/css/menu_list.css'


const MenuList = (prop: {menuCode: string}) => {
    return (
        <div className="menu-wrap">
            <ul className="menu-list">
                <li className="menu-li">메뉴1</li>
                <li className="menu-li">메뉴2</li>
                <li className="menu-li">메뉴3</li>
            </ul>
        </div>
    )
}

export default MenuList;