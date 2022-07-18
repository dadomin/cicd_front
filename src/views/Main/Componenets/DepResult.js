import { useEffect } from "react";

const DepResult = (props) => {
    const depRes = props.depRes;
    const setDepDisabled = props.setDepDisabled;
    const handleDepDisabled = () => {
        if(depRes === "success") {
            setDepDisabled(false);
        }
    }
    useEffect(()=> {
        handleDepDisabled();
    },[])
    return (
        <div>
            <p>서비스 배포 (운영) 결과</p>
            <input type={"text"} readOnly placeholder={depRes}></input>
        </div>
    )
}

export default DepResult;