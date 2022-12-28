import React, {Dispatch, SetStateAction, useState} from 'react';
import '../resources/css/menu.css';
import Project_select from "../components/project_select";

export interface projectProps {
    setSelectedProject: Dispatch<SetStateAction<number>>;
}


const Menu = () => {

    const [projectId, setProjectId] = useState(0);

    return (
        <div className="menu-layout">
            <Project_select  setSelectedProject={setProjectId}/>
            <div className="select-project"></div>
            <div className="menu-wrap">
                <ul className="menu-list">
                    <li className="menu-li">메뉴</li>
                </ul>
            </div>
            <div className="talk_channel">

            </div>
        </div>
    )
};

export default Menu;