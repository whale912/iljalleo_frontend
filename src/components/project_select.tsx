import React, {useEffect,  useState} from "react";
import '../layouts/menu'
import '../resources/css/project_select.css'
import axios from "axios";

/**
 * @ComponentName : ProjectSelect
 * @Description : 프로젝트 선택 Component
 * @Props : { selectedProjectInfo [선택된 프로젝트 정보 from App.tsx] },
 *          { selectProject [selectedProjectInfo state 변경함수 from App.tsx] }
 * @States : { selectedStyle [선택된 프로젝트 표시여부(display)] },
 *           { contentEditable [프로젝트 선택 입력가능여부] },
 *           { keyword [프로젝트 선택에서 입력한 키워드 => ProjectOptions에 전달] }
 * @UseEffects : { props.selectedProjectInfo : 프로젝트 선택을 감지하여 선택된 프로젝트 표시, 프로젝트 선택 입력가능여부 변경 }
 * @ChildComponents : { <ProjectOptions> [프로젝트 선택의 Option 목록] : 92 Line }
 */
const ProjectSelect = (props: {
        selectedProjectInfo: {prjtId: string, prjtName: string},
        selectProject: React.Dispatch<React.SetStateAction<{prjtId: string, prjtName: string}>>
    }) => {

    // 선택된 프로젝트 Div 스타일
    const [selectedStyle, setSelectedStyle] = useState({display: "none"});
    const [contentEditable, setContentEditable] = useState(true);
    const [keyword, setKeyword] = useState("");

    useEffect(()=>{
        if(props.selectedProjectInfo.prjtId==""){
            setSelectedStyle({display: "none"});
            setContentEditable(true);
        }else{
            setSelectedStyle({display: "block"});
            setContentEditable(false);
        }
    }, [props.selectedProjectInfo])

    /**
     * @MethodName : handleArrowClick
     * @Description : 화살표 버튼 클릭 이벤트
     * @Param e [ ClickEvent ]
     */
    const handleArrowClick = (e: React.MouseEvent<HTMLDivElement>) => {
        let eventTarget = e.target instanceof HTMLElement?e.target:null; // evetn 타겟 Element
        if(eventTarget!=null
            && eventTarget.nextElementSibling instanceof HTMLElement
            && eventTarget.previousSibling instanceof HTMLElement
            && eventTarget.previousSibling.previousSibling instanceof HTMLElement){ // type 체크
            // 타겟 다음 dom인 옵션박스
            let projectOptionBox = eventTarget.nextElementSibling;
            let projectSelectInput = eventTarget.previousSibling.previousSibling;
            setKeyword(projectSelectInput.innerHTML);
            // 숨긴 상태면 show / 보여지는 상태면 hide
            if(projectOptionBox.style.display=="none" || projectOptionBox.style.display==""){
                projectOptionBox.style.display="block";
            }else{
                projectOptionBox.style.display="none";
            }
        }
    }

    const handleInputFocusOn = (e: React.FocusEvent) => {
        let eventTarget = e.target instanceof HTMLElement?e.target:null; // event 타겟 Element
        if(eventTarget!=null){
            eventTarget.classList.remove("input-focusout");
        }
    }

    const handleInptuFocusOut = (e: React.FocusEvent) => {
        let eventTarget = e.target instanceof HTMLElement?e.target:null; // event 타겟 Element
        if(eventTarget!=null){
            eventTarget.classList.add("input-focusout");
        }
    }

    const handleInputPaste = (e: React.ClipboardEvent) => {
        let eventTarget = e.target instanceof HTMLElement?e.target:null; // event 타겟 Element
        if(eventTarget!=null){
            e.preventDefault();
            let pastedData = e.clipboardData;
            let textData = pastedData.getData('Text');
            eventTarget.innerText=textData;
        }
    }

    /**
     * @MethodName : handleInputKeydown
     * @Description : 프로젝트 선택 엔터키 막기
     * @Param e [ KeyDownEvent ]
     */
    const handleInputKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        let eventTarget = e.target instanceof HTMLElement?e.target:null; // event 타겟 Element
        if(eventTarget!=null) {
            if (e.keyCode == 13) {
                e.preventDefault();
                return false;
            }
        }
    }

    /**
     * @MethodName : handleInputKeyup
     * @Description : 프로젝트 선택 입력이벤트
     * @Param e [ KeyUpEvent ]
     */
    const handleInputKeyup = (e: React.KeyboardEvent<HTMLDivElement>) => {
        let eventTarget = e.target instanceof HTMLElement?e.target:null; // event 타겟 Element
        if(eventTarget!=null){
            // keyword state 변경 => <ProjectOptions>에서 props 변경 감지하여 키워드 검색 처리
            setKeyword(eventTarget.innerHTML);
        }
    }

    /**
     * @MethodName : handleCancelClick
     * @Description : 선택된 프로젝트 x버튼 클릭 이벤트
     * @Param e [ ClickEvent ]
     */
    const handleCancelClick = (e: React.MouseEvent<HTMLDivElement>) => {
        let eventTarget = e.target instanceof HTMLElement?e.target:null; // event 타겟 Element
        if(eventTarget!=null && eventTarget.parentElement!=null
            && eventTarget.parentElement.nextSibling instanceof HTMLElement
            && eventTarget.parentElement.nextSibling.nextSibling instanceof HTMLElement){ // type 체크
            // 모든 Option의 선택 class 제거(초기화)
            document.querySelectorAll(".project-option").forEach(option => {
                option.classList.remove("option-selected");
            });
            // 선택된 프로젝트 정보 초기가
            props.selectProject({prjtId: "", prjtName: ""});
        }
    }

    return (
        <div className="project-wrap">
            <div className="project-select" contentEditable={contentEditable} onPaste={handleInputPaste}
                 onKeyUp={handleInputKeyup} onKeyDown={handleInputKeydown}
                 onFocus={handleInputFocusOn} onBlur={handleInptuFocusOut}></div>
            <div className="selected-project" style={selectedStyle}>
                {props.selectedProjectInfo.prjtName}
                <div className="cancel-select" onClick={handleCancelClick}></div>
            </div>
            <div className="project-arrow" onClick={handleArrowClick}/>
            <ProjectOptions keyword={keyword} selectProject={props.selectProject}/>
        </div>
    )
}

/**
 * @ComponentName : ProjectOptions
 * @Description : 프로젝트 선택 Option Component
 * @Props : keyword [프로젝트 검색 키워드 from ProjectSelect]
 *          selectProject [selectedProjectInfo state 변경함수 from App.tsx]
 * @States : { style [프로젝트 Option Box의 Display 스타일] },
 *           { projectOptions [프로젝트 Option Div Element 배열] }
 * @UseEffects : { [] : 첫 렌더링 시 전체 프로젝트 목록을 가져와서 projectOptions 세팅 },
 *               { props.keyword : props keyword(프로젝트 선택 입력값) 변경 시 프로젝트 목록에서 키워드 검색 }
 */

const ProjectOptions = (props: {
        keyword: string,
        selectProject: React.Dispatch<React.SetStateAction<{prjtId: string, prjtName: string}>>
    }) => {

    const [style, setStyle] = useState({display: "none"});

    const [projectOptions, setProjectOptions] = useState([<div/>]);

    useEffect( () => {
        getProjectList((optionsList: JSX.Element [])=>{
            setProjectOptions(optionsList);
        });
    }, []);

    useEffect( () => {
        getProjectList((optionsList: JSX.Element [])=>{
            findKeywordFromText(props.keyword, optionsList);
        });
    }, [props.keyword]);

    /**
     * @MethodName : optionClickEvent
     * @Description : Option 클릭(선택) 이벤트
     * @Param e [ ClickEvent ]
     */
    const optionClickEvent = (e: React.MouseEvent<HTMLDivElement>) => {
        let eventTarget = e.target instanceof HTMLElement ? e.target : null; // event 타겟 Element
        if (eventTarget != null && eventTarget.parentElement instanceof HTMLElement) {
            // 모든 Option의 선택 class 제거(초기화)
            eventTarget.parentElement.querySelectorAll(".project-option").forEach(option => {
                option.classList.remove("option-selected");
            });
            // 선택한 타겟 Element 선택 class 추가
            eventTarget.classList.add("option-selected");
            // 선택된 프로젝트 State 변경 from App.tsx
            props.selectProject({prjtId: eventTarget.id, prjtName: eventTarget.innerHTML});
            // 선택한 후 Option Box 숨기기
            eventTarget.parentElement.style.display = "none";
        }
    }

    /**
     * @MethodName : findKeywordFromText
     * @Description : keyword로 검색된 Option만 세팅
     * @Param { keyword : 검색 키워드 }, { optionList : 전체 Option 배열 }
     */
    const findKeywordFromText = (keyword: string, optionList: JSX.Element []) => {
        if(keyword!=""){ // 키워드가 빈값이 아니면
            // 전체 목록에서 키워드가 포함된 목록을 찾아 projectOptions에 세팅
            let findList = optionList.filter(e => e.props.children.indexOf(keyword)!=-1);
            setProjectOptions(findList);

            // 검색된 Option이 하나라도 있을 경우 Option Box 노출
            if(findList.length>0){
                setStyle({display: "block"});
            }
        }else{
            setProjectOptions(optionList);
            // 키워드가 빈값이면 Option Box 숨김
            setStyle({display: "none"});
        }
    }

    /**
     * @MethodName : getProjectList
     * @Description : axios로 서버에서 프로젝트 목록 가져오기
     * @Param { callback : 응답받은 이후 실행할 callback 함수 }
     */
    const getProjectList = (callback:Function) =>{
        //TODO 프로젝트 전체 => 사용자가 참여중인 프로젝트 목록으로 변경 필요
        axios.get('http://localhost:8080/projects') 
            .then((Response)=>{
                let options = [] as JSX.Element [];
                // 기본 Option 넣기
                options.push(<div className="project-option" key={0} id="0" onClick={optionClickEvent}>미선택</div>);
                // 응답받은 프로젝트 목록 넣기
                options.push(...Response.data.map((projectInfo:{prjtId:number, prjtName:string}) =>
                    <div className="project-option" key={projectInfo.prjtId} id={projectInfo.prjtId+""}
                         onClick={optionClickEvent}>{projectInfo.prjtName}</div>));
                callback(options); // 목록 넣은 후 callback
            })
            .catch((Error)=>{
                console.log(Error)
            });
    }

    return (
        <div className="project-option-box" id={props.keyword} style={style}>
            {projectOptions}
        </div>
    )
}

export default ProjectSelect;