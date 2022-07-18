const TstDepResult = (props) => {
    const tstDepRes = props.tstDepRes;
    return (
        <div>
            <p>서비스 배포(테스트) 결과</p>
            <input type={"text"} readOnly placeholder={tstDepRes}></input>
        </div> 
    )
}

export default TstDepResult;