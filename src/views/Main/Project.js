import { useState } from "react";
import AppRej from "./Componenets/AppRej";
import AppResult from "./Componenets/AppResult";
import Deploy from "./Componenets/Deploy";
import DepResult from "./Componenets/DepResult";
import McResult from "./Componenets/McResult";
import MrCreate from "./Componenets/MrCreate";
import PrVers from "./Componenets/PrVers";
import TestDeploy from "./Componenets/TestDeploy";
import TstDepResult from "./Componenets/TstDepResult";

const Project = (props) => {
    const prId = props.prId;
    const prVer = props.prVer;
    const prName = props.prName;
    const itId = props.itId;

    const [choiceVer, setChoiceVer] = useState(""); // 선택한 프로젝트에서 선택한 버전
    const [tstDepRes, setTstDepRes] = useState(""); // 테스트 서비스 배포 결과
    const [mrId, setMrId] = useState(""); // 운영환경 적용 요청 시 생성된 mr id 
    const [mcRes, setMcRes] = useState(""); // 운영환경 적용 요청 결과 
    const [appRes, setAppRes] = useState(""); // 운영환경 승인/반려 결과
    const [depRes, setDepRes] = useState(""); // 운영환경 배포 결과

    const [choiceDisabled, setChoiceDisabled] = useState(true); // 버전선택 비활성화
    const [tstDepDisabled, setTstDepDisabled] = useState(true); // 테스트 배포 비활성화
    const [mrCreateDisabled, setMrCreateDisabled] =useState(true); // 운영 적용 비활성화
    const [appDisabled, setAppDisabled] = useState(true); // 운영 승인 비활성화
    const [depDisabled, setDepDisabled] = useState(true); // 운영 배포 비활성화
    // 버전 선택 보이기 (현재버전 포함)
    const showVer = (prVer) => {
        if(prVer !== "") {
            return <PrVers ver={prVer} choiceDisabled={choiceDisabled}changeChoiceVer={changeChoiceVer} choiceVer={choiceVer}></PrVers>
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
            return <TestDeploy tstDepDisabled={tstDepDisabled} changeTstDepRes={changeTstDepRes} prId={prId} choiceVer={choiceVer}tstDepRes ={tstDepRes}></TestDeploy>;
        }
    }
    // 테스트 배포 결과 
    const showTestDeployResult = () => {
        if(tstDepRes !== "") {
            return <TstDepResult setChoiceDisabled ={setChoiceDisabled}tstDepRes ={tstDepRes}/>;
        }
    }

    // 운영 적용 요청 
    const showMrCreate = () => {
        if(tstDepRes === "success") {
            return <MrCreate prName={prName} mrCreateDisabled={mrCreateDisabled} setTstDepDisabled={setTstDepDisabled}  choiceVer={choiceVer} setMrId={setMrId} setMcRes={setMcRes}></MrCreate>
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
            return <AppRej appDisabled={appDisabled} appRes={appRes} prId={prId} setMrCreateDisabled={setMrCreateDisabled} mrId={mrId} setAppRes={setAppRes}/>
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
            return <Deploy depDisabled={depDisabled} prId={prId} depRes={depRes} setAppDisabled={setAppDisabled} mrId={mrId} choiceVer={choiceVer} setDepRes={setDepRes}></Deploy>
        }
    }

    // 운영 배포 결과 보이기
    const showDepRes = () => {
        if(depRes !== "") {
            return <DepResult setDepDisabled={setDepDisabled} depRes={depRes}/>
        }
    }
    
    if(itId !== prId) {
        return null;
    }
    return (
        <>
        {}
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
        </>
    )
}
export default Project;