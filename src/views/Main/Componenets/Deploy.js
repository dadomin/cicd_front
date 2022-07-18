import axios from "axios";
const Deploy = (props) => {
    const prId = props.prId;
    const mrId = props.mrId;
    const choiceVer = props.choiceVer;
    const setDepRes = props.setDepRes;
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
            setDepRes(res.data.status)
        })
    }
    return (
        <div>
            <p>운영 환경</p>
            <div>
                <button onClick={appDeploy}>서비스 배포(운영)</button>
            </div>
        </div>
    )
}
export default Deploy;