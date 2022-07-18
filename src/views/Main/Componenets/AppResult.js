const AppResult = (props) => {
    const appRes = props.appRes;
    
    return (
        <div>
            <p>운영 적용 승인 결과</p>
            <input type={"text"} placeholder={appRes} readOnly></input>
        </div>
    )
}

export default AppResult;