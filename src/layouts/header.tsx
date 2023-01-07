import React from "react";
import '../resources/css/header.css'

import Profile from '../components/profile'


const Header = () => {
    return (
        <div className="header-bar">
            <div className="header-logo"></div>
            <div className="header-center"></div>
            <div className="header-profile">
                <Profile/>
            </div>
        </div>
    )
}

export default Header;