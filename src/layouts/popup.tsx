import React, {useState, useEffect} from 'react'
import '../resources/css/popup.css'
import axios from "axios";

const Popup = (props:{
        style: object, 
        setStyle: React.Dispatch<React.SetStateAction<{display: string}>>
    }) => {

    const [tbody, setTbody] = useState([] as JSX.Element [])

    const [tbody2, setTbody2] = useState([] as JSX.Element [])

    useEffect( () => {
        getGitCommitHistories((trList: JSX.Element [])=>{
            setTbody(trList);
            getGitCommitHistories2((trList2: JSX.Element [])=>{
                setTbody2(trList2);
            });
        });
    }, []);


    const popupClose = (e: React.MouseEvent) => {
        props.setStyle({display: "none"});
    }

    const exportGitCommitHistory = (url:string, databaseId:string) => {
        axios.get(url)
            .then((Response)=>{
                let commitData = {...Response.data};

                let notionReqBody = {
                    "cover": null,
                    "icon": null,
                    "parent": {
                        "type": "database_id",
                        "database_id": databaseId
                    },
                    "archived": false,
                    "properties": {
                        "수정파일": {
                            "type": "multi_select",
                            "multi_select": [
                            ]
                        },
                        "커밋일시": {
                            "type": "date",
                            "date": {
                                "start": "2023-01-02T00:00:00.000+09:00",
                                "end": null,
                                "time_zone": null
                            }
                        },
                        "내용": {
                            "title": [
                                {
                                    "type": "text",
                                    "text": {
                                        "content": "커밋내용"
                                    }
                                }
                            ]
                        }
                    }
                }


                // properties 수정파일 multi_select push
                for(let file of commitData.files){
                    let fileData = {
                        "name": file.filename as string

                    }
                    notionReqBody.properties.수정파일.multi_select.push(fileData as never);
                }

                // properties 커밋일시  start
                notionReqBody.properties.커밋일시.date.start = commitData["commit"]["committer"]["date"].slice(0, -1) + '.000+09:00';

                // properties 내용 title text
                notionReqBody.properties.내용.title[0].text.content = commitData["commit"]["message"];

                console.log(notionReqBody)

                axios.post("http://localhost:8080/git-to-notion", notionReqBody)
                    .then((Response)=>{
                        console.log(Response.data)
                    })
                    .catch((Error)=>{
                        console.log(Error)
                    })
            })
            .catch((Error)=>{
                console.log(Error)
            })
    }


    const getGitCommitHistories = (callback: Function)=> {
        axios.get('https://api.github.com/repos/whale912/iljalleo_frontend/commits')
            .then((Response)=>{
                if(Response.data.length>0){
                    let trArray = [] as JSX.Element [];
                    for(let [index, obj] of Response.data.entries()){
                        let tableContent =
                            <tr key={index}>
                                <td>{new Intl.DateTimeFormat('kr').format(new Date(obj["commit"]["committer"]["date"]))}</td>
                                <td>{obj["commit"]["message"]}</td>
                                <td><button className="exportBtn" onClick={()=>{exportGitCommitHistory(obj["url"], '469c1fed-203a-4847-a54d-973da1b8c3f4')}}>노션</button></td>
                            </tr>
                        trArray.push(tableContent)
                    }
                    callback(trArray);
                }
            })
            .catch((Error)=>{
                console.log(Error)
            })
    }


    const getGitCommitHistories2 = (callback: Function)=> {
        axios.get('https://api.github.com/repos/whale912/iljalleo/commits')
            .then((Response)=>{
                if(Response.data.length>0){
                    let trArray = [] as JSX.Element [];
                    for(let [index, obj] of Response.data.entries()){
                        let tableContent =
                            <tr key={index}>
                                <td>{new Intl.DateTimeFormat('kr').format(new Date(obj["commit"]["committer"]["date"]))}</td>
                                <td>{obj["commit"]["message"]}</td>
                                <td><button className="exportBtn" onClick={()=>{exportGitCommitHistory(obj["url"], '34efeecd-c820-42c4-9b9b-9d67454ede2e')}}>노션</button></td>
                            </tr>
                        trArray.push(tableContent)
                    }
                    callback(trArray);
                }
            })
            .catch((Error)=>{
                console.log(Error)
            })
    }


    
    return (
        <div className="popup-background" style={props.style}>
            <div className="popup-wrap">
                <div className="popup-header">
                    깃허브 커밋목록
                    <div className="popup-close" onClick={popupClose}>X</div>
                </div>
                <div className="popup-body">
                    <h3>git 커밋목록(프론트)</h3>
                    <div className="table_wrap">
                        <table className="gitTable">
                            <thead>
                                <tr>
                                    <th>커밋시간</th>
                                    <th>내용</th>
                                    <th>보내기</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tbody}
                            </tbody>
                        </table>
                    </div>


                    <h3>git 커밋목록(백)</h3>
                    <div className="table_wrap">
                        <table className="gitTable">
                            <thead>
                            <tr>
                                <th>커밋시간</th>
                                <th>내용</th>
                                <th>보내기</th>
                            </tr>
                            </thead>
                            <tbody>
                                {tbody2}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup;