import axios from "axios";
import { useEffect, useState } from "react";
import McResult from "./Componenets/McResult";
import MrCreate from "./Componenets/MrCreate";
import PrVers from "./Componenets/PrVers";
import TestDeploy from "./Componenets/TestDeploy";
import TstDepResult from "./Componenets/TstDepResult";
import AppRej from "./Componenets/AppRej";
import AppResult from "./Componenets/AppResult";
import Deploy from "./Componenets/Deploy";
import DepResult from "./Componenets/DepResult"

const Main = () => {

    const [url, setUrl] = useState(""); // gitlab 주소
    const [prList, setPrList] = useState({}); // gitlab 프로젝트 목록
    const [prVer, setPrVer] = useState(""); // gitlab 프로젝트 현 버전
    const [prId, setPrId] = useState(""); // 선택한 프로젝트 id
    const [choiceVer, setChoiceVer] = useState(""); // 선택한 프로젝트에서 선택한 버전
    const [tstDepRes, setTstDepRes] = useState(""); // 테스트 서비스 배포 결과
    const [prName, setPrName] = useState(""); // 선택한 프로젝트 name
    const [mrId, setMrId] = useState(""); // 운영환경 적용 요청 시 생성된 mr id 
    const [mcRes, setMcRes] = useState(""); // 운영환경 적용 요청 결과 
    const [appRes, setAppRes] = useState(""); // 운영환경 승인/반려 결과
    const [depRes, setDepRes] = useState(""); // 운영환경 배포 결과
 
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

    // 프로젝트 선택 시
    const selectPr = (e) => {
        setPrId(e.target.value);
        setPrName(e.target.getAttribute("pname"));
        getPrVer();
    }

    // 버전 선택 보이기 (현재버전 포함)
    const showVer = (prVer) => {
        if(prVer !== "") {
            return <PrVers ver={prVer} changeChoiceVer={changeChoiceVer} choiceVer={choiceVer}></PrVers>
        }
    }

    // 버전 선택 시
    const changeChoiceVer = (e) =>{
        setChoiceVer(e.target.value);
        showTestDeploy();
    }

    // 테스트 배포 결과 바꾸기
    const changeTstDepRes = (res) => {
        setTstDepRes(res);
    }
    // 테스트 배포창 보이기
    const showTestDeploy = () =>{
        if(choiceVer !== "") {
            return <TestDeploy changeTstDepRes={changeTstDepRes} prId={prId} choiceVer={choiceVer}></TestDeploy>;
        }
    }

    // 테스트 배포 결과 
    const showTestDeployResult = () => {
        if(tstDepRes !== "") {
            return <TstDepResult tstDepRes ={tstDepRes}/>
        }
    }

    // 운영 적용 요청 
    const showMrCreate = () => {
        if(tstDepRes === "success") {
            return <MrCreate prName={prName} choiceVer={choiceVer} setMrId={setMrId} setMcRes={setMcRes}></MrCreate>
        }
    }

    // 운영 적용 요청 결과 보여주기
    const showMcResult = () => {
        if(mcRes !== "") {
            return <McResult mcRes={mcRes} mrId = {mrId}></McResult>
        }
    }

    // 운영 환경 승인 & 반려 처리 버튼
    const showAppRej = () => {
        if(mcRes === "success") {
            return <AppRej prId={prId} mrId={mrId} setAppRes={setAppRes}/>
        }
    }

    // 승인 결과 보이기
    const showAppRes = () => {
        if(appRes !== "") {
            return <AppResult appRes={appRes}/>
        }
    }

    // 운영 배포 버튼 보이기
    const showDeploy = () => {
        if(appRes === "success") {
            return <Deploy prId={prId} mrId={mrId} choiceVer={choiceVer} setDepRes={setDepRes}></Deploy>
        }
    }

    // 운영 배포 결과 보이기
    const showDepRes = () => {
        if(depRes === "success") {
            return <DepResult depRes={depRes}/>
        }
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
                    <input type="text" readOnly placeholder={url}></input>
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
                        showVer(prVer)
                    }

                    {
                        showTestDeploy(choiceVer)
                    }

                    {
                        showTestDeployResult(tstDepRes)
                    }

                    {
                        showMrCreate(tstDepRes)
                    }

                    {
                        showMcResult(mcRes)
                    }
                    
                    {
                        showAppRej(mcRes)
                    }
                    
                    {
                        showAppRes(appRes)
                    }

                    {
                        showDeploy(appRes)
                    }


                    {
                        showDepRes(depRes)
                    }


                </section>

            </section>
        </section>
    )
}

export default Main;