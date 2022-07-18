const PrVers = (props) => {
    const ver = props.ver.split("-")[0];
    const choiceVer = props.choiceVer;
    const changeChoiceVer = props.changeChoiceVer;
    const choiceDisabled = props.choiceDisabled;

    const verSplit = ver.split(".");
    const verChoice1 = (parseInt(verSplit[0])+1) + "." + verSplit[1] + "." + verSplit[2];
    const verChoice2 = verSplit[0] + "." + (parseInt(verSplit[1])+1) + "." + verSplit[2];
    const verChoice3 = verSplit[0] + "." + verSplit[1] + "." + (parseInt(verSplit[2])+1);
    return (
        <div>
            <p>버전선택 (현재 : {ver})</p>
            <div>
                <input type="radio" id="verChoice1" disabled={!choiceDisabled} name="verChoice" value={verChoice1} onChange={e=>changeChoiceVer(e)} checked={choiceVer === verChoice1}></input>
                <label htmlFor="verChoice1">{verChoice1}</label>
                <input type="radio" id="verChoice2" name="verChoice" disabled={!choiceDisabled} value={verChoice2} onChange={e=>changeChoiceVer(e)} checked={choiceVer === verChoice2}></input>
                <label htmlFor="verChoice2">{verChoice2}</label>
                <input type="radio" id="verChoice3" name="verChoice"disabled={!choiceDisabled}  value={verChoice3} onChange={e=>changeChoiceVer(e)} checked={choiceVer === verChoice3}></input>
                <label htmlFor="verChoice3">{verChoice3}</label>
            </div>
        </div>
    )
}

export default PrVers;