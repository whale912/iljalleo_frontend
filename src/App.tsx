import React, {useState} from 'react';
import './App.css';
import Header from './layouts/header';
import Menu from './layouts/menu';
import Main from './layouts/main';

/**
 * @ComponentName : App
 * @Description : 프로그램 전체 Layout
 * @States : { selectedProjectInfo [선택된 프로젝트 정보 프로그램 전역변수로 필요한 Component에 전달] }
 * @ChildComponents : { <Header> [화면 상단 Layout - header.tsx] },
 *                    { <Menu> [화면 좌측 메뉴 Layout - menu.tsx] },
 *                    { <Main> [프로그램 Main Layout - main.tsx] }
 */

function App() {
    // 전역변수 Project State
    const [selectedProjectInfo, selectProject] = useState({prjtId: "", prjtName: ""});

    return (
        <div className="wrap-div">
            <Header/>
            <Menu selectedProjectInfo={selectedProjectInfo} selectProject={selectProject}/>
            <Main/>
        </div>
    );
}

export default App;
