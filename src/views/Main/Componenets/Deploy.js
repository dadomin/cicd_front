import axios from "axios";
import { useEffect } from "react";
const Deploy = (props) => {
    const prId = props.prId;
    const mrId = props.mrId;
    const choiceVer = props.choiceVer;
    const setDepRes = props.setDepRes;
    const depRes = props.depRes;
    const depDisabled = props.depDisabled;

    const setAppDisabled = props.setAppDisabled;

    const handleAppDisabled = () => {
        setAppDisabled(false);
    }

    useEffect(()=>{
        handleAppDisabled();
    },[])
    const appDeploy = () => {
        axios
        .post("http://localhost:3787/mr/deploy", {
            project_id : prId,
            target_branch : "main",
            mr_id : mrId,
            version : choiceVer
        })
        .then((res) => {
            console.log(res.data);
            setDepRes(res.data.status);
        })
    }

    const redirect = () => {
        axios
        .get("http://localhost:3787/deploy/status")
        .then((res)=>{
            console.log(res.data);
            setDepRes(res.data.status);
        })
    }
    return (
        <div>
            <p>운영 환경</p>
            <div>
                <button disabled={!depDisabled} onClick={appDeploy}>서비스 배포(운영)</button>
                <button className="red" onClick={redirect}disabled={depRes !== "wait" ? 1 :0}>Redirect</button>
            </div>
        </div>
    )
}
export default Deploy;