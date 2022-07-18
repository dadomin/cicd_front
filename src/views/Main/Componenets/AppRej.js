import axios from "axios";
import { useEffect } from "react";

const AppRej = (props) => {
    const prId = props.prId;
    const targetBranch = "main";
    const mrId = props.mrId;
    const setAppRes = props.setAppRes;
    const appRes = props.appRes;
    const appDisabled = props.appDisabled;

    const setMrCreateDisabled = props.setMrCreateDisabled;
    const handleMrCreateDisabled = () => {
        setMrCreateDisabled(false);
    }

    useEffect(()=> {
        handleMrCreateDisabled();
    },[])

    const mrApprove = () => {
        axios
        .post("http://localhost:3787/mr/approve", {
            project_id : prId,
            target_branch : targetBranch,
            mr_id : mrId
        })
        .then((res) => {
            console.log(res.data);
            setAppRes(res.data.status);
        })
    }

    const mrReject = () => {
        axios 
        .post("http://localhost:3787/mr/reject", {
            project_id : prId,
            target_branch : targetBranch,
            mr_id : mrId
        })
        .then((res) => {
            console.log(res.data);
            setAppRes(res.data.status);
        })
    }

    const redirect = () => {
        axios
        .get("http://localhost:3787/deploy/status")
        .then((res)=>{
            console.log(res.data);
            setAppRes(res.data.status);
        })
    }
    return (
        <div>
            <p>운영 환경</p>
            <div>
                <button disabled={!appDisabled} onClick={mrApprove}>승인</button>
                <button disabled={!appDisabled} className="red" onClick={mrReject}>반려</button>
                <button className="red" onClick={redirect} disabled={appRes !== "wait" ? 1 : 0}>Redirect</button>
            </div>
        </div> 
    )
}

export default AppRej;