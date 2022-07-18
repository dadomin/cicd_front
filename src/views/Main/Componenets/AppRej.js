import axios from "axios";

const AppRej = (props) => {
    const prId = props.prId;
    const targetBranch = "main";
    const mrId = props.mrId;
    const setAppRes = props.setAppRes;

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
    return (
        <div>
            <p>운영 환경</p>
            <div>
                <button onClick={mrApprove}>승인</button>
                <button className="red" onClick={mrReject}>반려</button>
            </div>
        </div> 
    )
}

export default AppRej;