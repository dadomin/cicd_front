import axios from "axios";
const TestDeploy = (props) => {
    const changeTstDepRes = props.changeTstDepRes;
    const choiceVer = props.choiceVer;
    const prId = props.prId;
    const tstDepRes = props.tstDepRes;
    const tstDepDisabled = props.tstDepDisabled;
    const exeTstDep = () => {
        axios
        .post("http://localhost:3787/mr/deploy", {
            project_id : prId,
            target_branch : 'test',
            mr_id : '',
            version : choiceVer
        })
        .then((res)=> {
            console.log(res.data);
            changeTstDepRes(res.data.status);
        })
    }
    const redirect = () => {
        axios
        .get("http://localhost:3787/deploy/status")
        .then((res)=>{
            console.log(res.data);
            changeTstDepRes(res.data.status);
        })
    }
    if(choiceVer === "") {
        return null;
    }else
    return(
        <div>
            <p>테스트 환경</p>
            <div>
                <button disabled={!tstDepDisabled} onClick={exeTstDep}>서비스 배포(테스트)</button>
                <button className="red" onClick={redirect} disabled={tstDepRes !== "wait" ? 1 : 0}>Redirect</button>
            </div>
        </div>
    )
}

export default TestDeploy;