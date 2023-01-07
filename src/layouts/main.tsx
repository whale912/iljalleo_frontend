import React, {useState} from "react";
import '../resources/css/main.css'
import Popup from './popup'

const Main = () => {

    const [style, setStyle] = useState({display: "none"});

    const popupOpen = (e: React.MouseEvent) => {
        if(style.display=="none"){
            setStyle({display:"flex"});
        }
    }

    return (
        <div className="main-layout">
            <button onClick={popupOpen}>팝업</button>
            <Popup style={style} setStyle={setStyle}></Popup>
        </div>
    )
};

export default Main;
