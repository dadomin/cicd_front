import axios from "axios";
import { useEffect, useState } from "react";
import Project from "./Project";

const Main = () => {

    const [url, setUrl] = useState(""); // gitlab 주소
    const [prList, setPrList] = useState({}); // gitlab 프로젝트 목록
    const [prId, setPrId] = useState(""); // 선택한 프로젝트 id
    const [prName, setPrName] = useState(""); // 선택한 프로젝트 name
    const [prVer, setPrVer] = useState(""); // gitlab 프로젝트 현 버전
 
    // gitlab 주소 가져오기
    const getUrl = () => {
        axios
        .get("http://ec2-15-165-203-164.ap-northeast-2.compute.amazonaws.com:8000/")
        .then((res)=> {
            setUrl(res.data.Hello);
        });
    }

    // 프로젝트 list 가져오기
    const getPrList = () =>{
        axios
        .get("http://ec2-15-165-203-164.ap-northeast-2.compute.amazonaws.com:8000/project/list")
        .then((res)=>{
            setPrList(res.data.projectList);
        })
    }

    // 선택한 프로젝트 버전 가져오기
    const getPrVer = () => {
        axios
        .get("http://ec2-15-165-203-164.ap-northeast-2.compute.amazonaws.com:8000/mr/tag", {
            params : {
                projecId : prId,
                envGit : "dev"
            }
        })
        .then((res) => {
            setPrVer(res.data);
        })
    }

    // const clearAll = () => {
    //     setPrVer("");
    //     setChoiceVer("");
    //     setPrId("");
    //     setTstDepRes("");
    //     setPrName("");
    //     setMrId("");
    //     setMcRes("");
    //     setAppRes("");
    //     setDepRes("");
    //     setChoiceDisabled(true);
    //     setTstDepDisabled(true);
    //     setMrCreateDisabled(true);
    //     setAppDisabled(true);
    //     setDepDisabled(true);
    // }
    // 프로젝트 선택 시
    const selectPr = (e) => {
        // clearAll();
        setPrId(e.target.value);
        setPrName(e.target.getAttribute("pname"));
        getPrVer();
    }


    const setProjectDom = (list) => {
        let arr = [];
        for(let i = 0; i < list.length; i++) {
            arr.push(
                <Project key={list[i].project_id} itId={list[i].project_id} prId={prId} prName={prName} prVer={prVer}></Project>
            )
        }
        return arr
    }

    // 페이지 로딩 시
    useEffect(()=> {
        getUrl();
        getPrList();
    },[]);

    // 프로젝트 리스트 가져오기
    function setPrListItem(list) {
        let arr = [];
        for(let i = 0; i < list.length; i++) {
            arr.push (
                <div className="project-list" key={list[i].project_id}>
                    <input type="radio" pname={list[i].project_name} name="gitlab-project"id={"pr-"+list[i].project_id} value={list[i].project_id} onChange={e=>selectPr(e)} checked={prId === list[i].project_id}></input>
                    <label htmlFor={"pr-"+list[i].project_id}>{list[i].project_name} ({list[i].describe})</label>
                </div>
            )
        }
        return arr;
    }

    return (
        <section id="container">
            <div className="main-title">
                <h1>임시 형상관리</h1>
                <div>
                    <p>GitLab 주소</p>
                    <input type="text" readOnly placeholder={"http://devsoopcicd.shinhan.com:7443/api/v4/"}></input>
                </div>
            </div>


            <section id="main">
                
                <section className="main-left">
                    <p>GitLab 프로젝트</p>
                    <div className="project-list-box">

                        {
                            setPrListItem(prList)
                        }

                    </div>


                </section>

                <section className="main-right">
                   {
                    setProjectDom(prList)
                   }
                </section>

            </section>
        </section>
    )
}

export default Main;