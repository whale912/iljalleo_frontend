import React, {useState} from 'react';
import '../resources/css/menu.css';
import ProjectSelect from "../components/project_select";
import MenuToggle from '../components/menu_toggle'
import MenuList from '../components/menu_list'


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
    
    const [menuCode, selectMenu] = useState('project');

    return (
        <div className="menu-layout">
            <ProjectSelect selectedProjectInfo={props.selectedProjectInfo} selectProject={props.selectProject}/>
            <MenuToggle selectedProjectInfo={props.selectedProjectInfo} selectMenu={selectMenu}/>
            <MenuList menuCode={menuCode}/>
            <div className="talk_channel">

            </div>
        </div>
    )
};

export default Menu;