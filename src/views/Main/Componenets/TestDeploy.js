import axios from "axios";
const TestDeploy = (props) => {
    const changeTstDepRes = props.changeTstDepRes;
    const choiceVer = props.choiceVer;
    const prId = props.prId;
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
    if(choiceVer === "") {
        return null;
    }else
    return(
        <div>
            <p>테스트 환경</p>
            <div>
                <button onClick={exeTstDep}>서비스 배포(테스트)</button>
            </div>
        </div>
    )
}

export default TestDeploy;