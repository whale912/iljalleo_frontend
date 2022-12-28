import React, {Dispatch, SetStateAction, useState} from "react";
import '../layouts/menu'
import '../resources/css/project_select.css'
import {projectProps} from "../layouts/menu";

const Project_select:React.FC<projectProps> = ({setSelectedProject}) => {

    // 화살표 버튼 클릭시 select 옵션 리스트 보여주기
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        let eventTarget = e.target instanceof HTMLElement?e.target:null;
        if(eventTarget!=null && eventTarget.nextElementSibling instanceof HTMLElement){ // type 체크
            let projectOptionBox = eventTarget.nextElementSibling; // 옵션박스
            if(projectOptionBox.style.display=="none"){ // 숨긴 상태면 show / 보여지는 상태면 hide
                projectOptionBox.style.display="block";
            }else{
                projectOptionBox.style.display="none";
            }
        }
    }

    return (
        <div className="project-wrap">
            <div className="project-select" contentEditable="true"></div>
            <div className="project-arrow" onClick={handleClick}/>
            <div className="project-option-box">
                <ProjectOptions/>
                <ProjectOptions/>
                <ProjectOptions/>
                <ProjectOptions/>
                <ProjectOptions/>
                <ProjectOptions/>
            </div>
        </div>
    )
}

const ProjectOptions = () => {
    return (
        <div className="project-option"></div>
    )
}

export default Project_select;