import { useEffect } from "react";

const TstDepResult = (props) => {
    const tstDepRes = props.tstDepRes;
    const setChoiceDisabled = props.setChoiceDisabled;
    const handleChoiceDisabled = () => {
        if(tstDepRes !== "false") {
            setChoiceDisabled(false);
        }
    }
    useEffect(()=> {
        handleChoiceDisabled();
    },[])
    return (
        <div>
            <p>서비스 배포(테스트) 결과</p>
            <input type={"text"} readOnly placeholder={tstDepRes}></input>
        </div> 
    )
}

export default TstDepResult;