import axios from "axios";
import { useEffect } from "react";

const MrCreate = (props) => {
    const prName = props.prName;
    const setMrId = props.setMrId;
    const setMcRes = props.setMcRes;

    const setTstDepDisabled = props.setTstDepDisabled;
    const mrCreateDisabled = props.mrCreateDisabled;
    const handleTstDeptDisabled = () => {
        setTstDepDisabled(false);
    }
    useEffect(()=> {
        handleTstDeptDisabled();
    },[])
    const exeMrCreate = () => {
        axios
        .post("http://localhost:3787/mr/create", {
            project_name : prName,
            source_branch : "dev",
            target_branch : "main",
            title : "title",
            describe : "desc"
        })
        .then((res)=>{
            console.log(res.data);
            setMrId(res.data.mr_id);
            setMcRes(res.data.status);
        })
    }

    return(
        <div>
            <p>운영 환경</p>
            <div>
                <button disabled={!mrCreateDisabled} onClick={exeMrCreate}>운영적용 요청</button>
            </div>
        </div>
    )
    
}

export default MrCreate;