import React, {useState, useEffect} from 'react';
import '../resources/css/menu_toggle.css'

const MenuToggle = (props: {
        selectedProjectInfo: {prjtId:string, prjtName:string},
        selectMenu: React.Dispatch<React.SetStateAction<string>>
    }) => {

    const [toggleStyle, setToggleStyle] = useState({display: "block"});

    useEffect(()=>{
        if(props.selectedProjectInfo.prjtId!=""){
            setToggleStyle({display: "none"});
        }else{
            setToggleStyle({display: "block"});
        }
    }, [props.selectedProjectInfo.prjtId])
    
    const menuToggle = (e: React.MouseEvent) => {
        let eventTarget = e.target instanceof HTMLElement?e.target:null;
        if(eventTarget!=null){
            let classList = eventTarget.classList;
            if(classList[1]!=null){
                console.log(classList[1].replace("-button", ""));
                props.selectMenu(classList[1].replace("-button", ""));
            }
        }
    }
    
    return (
        <div className="menu-toggle_wrap" style={toggleStyle}>
            <div className="toggle_button project-button" onClick={menuToggle}></div>
            <div className="toggle_button messenger-button" onClick={menuToggle}></div>
            <div className="toggle_button schedule-button" onClick={menuToggle}></div>
        </div>
    )
}

export default MenuToggle;