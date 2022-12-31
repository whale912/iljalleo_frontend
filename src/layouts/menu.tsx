import React, {Dispatch, SetStateAction, useState} from 'react';
import '../resources/css/menu.css';
import ProjectSelect from "../components/project_select";


/**
 * @ComponentName : Menu
 * @Description : 좌측 메뉴 Layout
 * @Props : { selectedProjectInfo [선택된 프로젝트 정보 from App.tsx] },
 *          { selectProject [selectedProjectInfo state 변경함수 from App.tsx] }
 * @ChildComponents : { <ProjectSelect> [프로젝트 선택 Component - project-select.tsx] }
 */

const Menu = (props: {
        selectedProjectInfo: {prjtId:string, prjtName:string},
        selectProject:React.Dispatch<React.SetStateAction<{prjtId: string, prjtName: string}>>
    }) => {

    return (
        <div className="menu-layout">
            <ProjectSelect selectedProjectInfo={props.selectedProjectInfo} selectProject={props.selectProject}/>
            <div className="menu-wrap">
                <ul className="menu-list">
                    <li className="menu-li"></li>
                </ul>
            </div>
            <div className="talk_channel">

            </div>
        </div>
    )
};

export default Menu;