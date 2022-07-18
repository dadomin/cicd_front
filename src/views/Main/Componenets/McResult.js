const McResult = (props) => {
    const mrId = props.mrId;
    const mcRes = props.mcRes;
    return (
        <>
        <div>
            <p>운영 MR ID</p>
            <input type={"text"} placeholder={mrId} readOnly></input>
        </div>
        <div>
            <p>운영 적용 요청 결과</p>
            <input type={"text"} placeholder={mcRes} readOnly></input>
        </div>
        </>
    )
}

export default McResult;